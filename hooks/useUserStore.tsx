import { LOADING_STATE, type LoadingState } from "@/constants/user-profile";
import { auth, db } from "@/firebase";
import type { UserProfile } from "@/lib/actions";
import { setToken } from "@/lib/api/set-token";
import type { User } from "firebase/auth";
import type { FirestoreError } from "firebase/firestore";
import { doc, onSnapshot } from "firebase/firestore";
import { create } from "zustand";

interface UserStore {
  authUser: User | null;
  profile: UserProfile | null;
  loading: LoadingState;
  init: () => () => void; // ✅ explicitly return an unsubscribe function
  clear: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  authUser: null,
  profile: null,
  loading: LOADING_STATE.PENDING,
  init: () => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        set({ authUser, loading: LOADING_STATE.PENDING });

        const token = await authUser.getIdToken(true);
        await setToken(token);

        // Subscribe to Firestore profile
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

        // Unsub both on logout
        set(() => ({
          clear: () => {
            unsubProfile();
            set({ authUser: null, profile: null });
          },
        }));
      } else {
        set({ authUser: null, profile: null, loading: LOADING_STATE.RESOLVED });
      }
    });

    // Unsubscribe from auth listener on unload (optional, for SSR/hard refresh)
    return unsubscribe;
  },

  clear: () => {
    set({ authUser: null, profile: null });
  },
}));
