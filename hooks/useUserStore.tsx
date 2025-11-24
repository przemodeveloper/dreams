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
	getDoc,
	onSnapshot,
	orderBy,
	query,
	updateDoc,
	where,
	writeBatch,
} from "firebase/firestore";
import { create } from "zustand";
import AvatarImage from "@/public/default-avatar.png";
import type { Profile } from "@/models/profiles";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserStore {
	authUser: User | null;
	profile: UserProfile | null;
	loading: LoadingState;
	init: () => () => void;
	clear: () => void;
	unsubProfile: (() => void) | null;
	// Potential matches
	profiles: Profile[] | null;
	profilesLoading: LoadingState;
	getProfiles: (userId: string) => Promise<void>;
	setAccept: (
		userId: string,
		notify: (message: string) => void
	) => Promise<void>;
	setReject: (
		userId: string,
		notify: (message: string) => void
	) => Promise<void>;
	// Actual matches
	matchedProfiles: Profile[] | null;
	matchedProfilesLoading: LoadingState;
	getMatchedProfiles: (userId: string) => Promise<void>;
}

export const useUserStore = create<UserStore>()(
	persist(
		(set, get) => ({
			authUser: null,
			profile: null,
			loading: LOADING_STATE.IDLE,
			unsubProfile: null,

			// Potential matches
			profiles: null,
			profilesLoading: LOADING_STATE.IDLE,
			// Actual matches
			matchedProfiles: null,
			matchedProfilesLoading: LOADING_STATE.IDLE,

			setReject: async (userId: string, notify: (message: string) => void) => {
				const { profile, profiles } = get();
				if (!profile?.userId) return;
				if ((profile?.rejectedProfiles || []).includes(userId)) return;

				try {
					await updateDoc(doc(db, "profiles", profile.userId), {
						rejectedProfiles: arrayUnion(userId),
					});

					set({
						profiles: profiles?.filter((profile) => profile.id !== userId),
					});
				} catch (err) {
					notify(`Failed to reject user: ${err}`);
				}
			},

			setAccept: async (userId: string, notify: (message: string) => void) => {
				const { profile, profiles, getMatchedProfiles } = get();
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

				const isMatch = (profile?.likesReceived || []).includes(userId);

				if (isMatch) {
					batch.update(profileRef, { matches: arrayUnion(userId) });
					batch.update(userRef, { matches: arrayUnion(profile.userId) });
				}

				try {
					await batch.commit();
					set({
						profiles: profiles?.filter((profile) => profile.id !== userId),
					});
					if (isMatch) {
						await getMatchedProfiles(userId);
						notify(`You have a match! Check your matches drawer to see them.`);
					}
				} catch (err) {
					notify(`Failed to accept user: ${err}`);
				}
			},

			getProfiles: async (userId: string) => {
				const { profile } = get();

				set({ profilesLoading: LOADING_STATE.PENDING });

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
						profiles: processedProfiles,
						profilesLoading: LOADING_STATE.RESOLVED,
					});
				} catch (error) {
					console.error("Error getting match profiles:", error);
					set({
						profiles: [],
						profilesLoading: LOADING_STATE.REJECTED,
					});
				}
			},

			getMatchedProfiles: async (userId: string) => {
				const { profile } = get();

				if (!userId) {
					set({
						matchedProfiles: [],
						matchedProfilesLoading: LOADING_STATE.RESOLVED,
					});
					return;
				}

				set({ matchedProfilesLoading: LOADING_STATE.PENDING });

				try {
					const { matches } = profile || {};

					if (!matches || matches.length === 0) {
						set({
							matchedProfiles: [],
							matchedProfilesLoading: LOADING_STATE.RESOLVED,
						});
						return;
					}

					const profilePromises = matches.map((matchedUserId) =>
						getDoc(doc(db, "profiles", matchedUserId))
					);

					const profileSnapshots = await Promise.all(profilePromises);

					const processedProfiles: Profile[] = profileSnapshots
						.filter((snapshot) => snapshot.exists())
						.map((snapshot) => {
							const profileData = snapshot.data() as UserProfile;
							return {
								id: profileData.userId,
								username: profileData.username,
								image: profileData.images.find((i) => i.downloadUrl) ?? {
									downloadUrl: AvatarImage.src,
									filePath: "",
									imageRefId: "",
								},
								age: profileData.age,
								bio: profileData.bio || "",
								dream: profileData.dream,
								orientation: profileData.orientation,
								interests: profileData.interests,
								gender: profileData.gender,
							};
						});

					set({
						matchedProfiles: processedProfiles,
						matchedProfilesLoading: LOADING_STATE.RESOLVED,
					});
				} catch (error) {
					console.error("Error getting matched profiles:", error);
					set({
						matchedProfiles: [],
						matchedProfilesLoading: LOADING_STATE.REJECTED,
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
							loading: LOADING_STATE.IDLE,
							unsubProfile: null,
							profiles: null,
							profilesLoading: LOADING_STATE.IDLE,
							matchedProfiles: null,
							matchedProfilesLoading: LOADING_STATE.IDLE,
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
					loading: LOADING_STATE.IDLE,
					profiles: null,
					profilesLoading: LOADING_STATE.IDLE,
					matchedProfiles: null,
					matchedProfilesLoading: LOADING_STATE.IDLE,
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
