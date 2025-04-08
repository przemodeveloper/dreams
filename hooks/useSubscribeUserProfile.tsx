import { db } from "@/firebase";
import type { UserProfile } from "@/models/auth";
import type { FirestoreError } from "firebase/firestore";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";

export function useSubscribeUserProfile(userId: string) {
	const [userData, setUserData] = useState<Partial<UserProfile> | null>(null);
	const [loading, setLoading] = useState<
		"pending" | "idle" | "error" | "resolved"
	>("pending");

	useEffect(() => {
		if (!userId) return;

		const userProfileCollection = collection(
			db,
			"profiles",
			userId,
			"userProfile"
		);
		const q = query(userProfileCollection);

		const unsubscribe = onSnapshot(
			q,
			(snapshot) => {
				if (snapshot.empty) {
					setUserData(null);
					setLoading("resolved");
					return;
				}

				const docData = snapshot.docs[0].data();
				setUserData(docData as Partial<UserProfile>);
				setLoading("resolved");
			},
			(error: FirestoreError) => {
				setLoading("error");
				throw new Error(error.message);
			}
		);

		return () => {
			unsubscribe();
			setUserData(null);
		};
	}, [userId]);

	return { userData, loading };
}
