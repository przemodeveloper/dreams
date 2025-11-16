import { LOADING_STATE, type LoadingState } from "@/constants/user-profile";
import { auth, db } from "@/firebase";
import type { UserProfile } from "@/lib/actions";
import { setToken } from "@/lib/api/set-token";
import type { User } from "firebase/auth";
import type { FirestoreError } from "firebase/firestore";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { create } from "zustand";
import AvatarImage from "@/public/default-avatar.png";
import { Profile } from "@/models/profiles";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserStore {
  authUser: User | null;
  profile: UserProfile | null;
  loading: LoadingState;
  init: () => () => void;
  clear: () => void;
  unsubProfile: (() => void) | null;
  matchProfiles: Profile[] | null;
  matchProfilesLoading: LoadingState;
  getMatchProfiles: (userId: string) => Promise<void>;
  setAccept: (userId: string) => Promise<void>;
  setReject: (userId: string) => Promise<void>;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      authUser: null,
      profile: null,
      loading: LOADING_STATE.IDLE,
      unsubProfile: null,

      matchProfiles: null,
      matchProfilesLoading: LOADING_STATE.IDLE,

      setReject: async (userId: string) => {
        const { profile } = get();
        if (!profile?.userId) return;
        if ((profile?.rejectedProfiles || []).includes(userId)) return;

        try {
          await updateDoc(doc(db, "profiles", profile.userId), {
            rejectedProfiles: arrayUnion(userId),
          });
        } catch (err) {
          console.error("Failed to reject user:", err);
        }
      },

      setAccept: async (userId: string) => {
        const { profile } = get();
        if (!profile?.userId) return;
        if ((profile?.acceptedProfiles || []).includes(userId)) return;

        const batch = writeBatch(db);

        const profileRef = doc(db, "profiles", profile.userId);

        batch.update(profileRef, {
          acceptedProfiles: arrayUnion(userId),
        });

        const userRef = doc(db, "profiles", userId);
        batch.update(userRef, {
          likesReceived: arrayUnion(profile.userId),
        });

        if ((profile?.likesReceived || []).includes(userId)) {
          batch.update(profileRef, { matches: arrayUnion(userId) });
          batch.update(userRef, { matches: arrayUnion(profile.userId) });
        }

        try {
          await batch.commit();
        } catch (err) {
          console.error("Failed to accept user:", err);
        }
      },

      getMatchProfiles: async (userId: string) => {
        const { profile } = get();

        set({ matchProfilesLoading: LOADING_STATE.PENDING });

        try {
          const q = query(
            collection(db, "profiles"),
            where("userId", "!=", userId),
            orderBy("userId")
          );

          const querySnapshot = await getDocs(q);

          const excludedProfiles = new Set([
            userId,
            ...(profile?.acceptedProfiles || []),
            ...(profile?.rejectedProfiles || []),
          ]);

          const userMatchProfiles = querySnapshot.docs
            .map((doc) => doc.data() as UserProfile)
            .filter((profile) => !excludedProfiles.has(profile.userId));

          const processedProfiles: Profile[] = userMatchProfiles.map(
            (profile) => ({
              id: profile.userId,
              username: profile.username,
              image: profile.images.find((i) => i.downloadUrl) ?? {
                downloadUrl: AvatarImage.src,
                filePath: "",
                imageRefId: "",
              },
              age: profile.age,
              bio: profile.bio || "",
              dream: profile.dream,
              orientation: profile.orientation,
              interests: profile.interests,
              gender: profile.gender,
            })
          );

          set({
            matchProfiles: processedProfiles,
            matchProfilesLoading: LOADING_STATE.RESOLVED,
          });
        } catch (error) {
          console.error("Error getting match profiles:", error);
          set({
            matchProfiles: [],
            matchProfilesLoading: LOADING_STATE.REJECTED,
          });
        }
      },

      init: () => {
        const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
          if (authUser) {
            const prevUnsubProfile = get().unsubProfile;
            if (prevUnsubProfile) prevUnsubProfile();

            set({ authUser, loading: LOADING_STATE.PENDING });

            const token = await authUser.getIdToken(true);
            await setToken(token);

            const userProfileDoc = doc(db, "profiles", authUser.uid);

            const unsubProfile = onSnapshot(
              userProfileDoc,
              (snapshot) => {
                if (!snapshot.exists()) {
                  set({ profile: null, loading: LOADING_STATE.RESOLVED });
                  return;
                }

                const docData = snapshot.data();
                set({
                  profile: docData as UserProfile,
                  loading: LOADING_STATE.RESOLVED,
                });
              },
              (error: FirestoreError) => {
                console.error("User profile error:", error.message);
                set({ loading: LOADING_STATE.REJECTED });
              }
            );

            set({ unsubProfile });
          } else {
            const prevUnsubProfile = get().unsubProfile;
            if (prevUnsubProfile) prevUnsubProfile();

            set({
              authUser: null,
              profile: null,
              loading: LOADING_STATE.RESOLVED,
              unsubProfile: null,
            });
          }
        });

        return unsubscribe;
      },

      clear: () => {
        const { unsubProfile } = get();
        if (unsubProfile) unsubProfile();
        set({
          authUser: null,
          profile: null,
          unsubProfile: null,
          matchProfiles: null,
        });
      },
    }),
    {
      name: "user-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        profile: state.profile,
      }),
    }
  )
);
