import { db } from "@/firebase";
import { UserProfile } from "@/models/auth";
import {
	collection,
	doc,
	FirestoreError,
	getDocs,
	onSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export function useSubscribeUserProfile(userId: string) {
	const [userData, setUserData] = useState<Partial<UserProfile> | null>(null);
	const [loading, setLoading] = useState("pending");

	useEffect(() => {
		if (!userId) return;

		const getProfileDocRef = async () => {
			const userProfileCollection = collection(
				db,
				"profiles",
				userId,
				"userProfile"
			);
			const snapshot = await getDocs(userProfileCollection);
			if (snapshot.empty) throw new Error("User profile not found");
			const userProfileDocId = snapshot.docs[0].id;
			return doc(db, "profiles", userId, "userProfile", userProfileDocId);
		};

		let unsubscribe: () => void;

		getProfileDocRef().then((profileDocRef) => {
			unsubscribe = onSnapshot(
				profileDocRef,
				(docSnap) => {
					const data = docSnap.data();
					setUserData((data as Partial<UserProfile>) || null);
					setLoading("resolved");
				},
				(error: FirestoreError) => {
					setLoading("error");
					throw new Error(error.message);
				}
			);
		});

		return () => unsubscribe?.();
	}, [userId]);

	return { userData, loading };
}
