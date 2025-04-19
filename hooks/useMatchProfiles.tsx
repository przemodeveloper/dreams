import { db } from "@/firebase";
import type { UserProfile } from "@/lib/actions";
import { collectionGroup, getDocs, query, where } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";

export function useMatchProfiles(userId?: string) {
	const [matchProfiles, setMatchProfiles] = useState<UserProfile[] | null>(
		null
	);

	const getMatchProfilesCollection = useCallback(async (userId: string) => {
		const userMatchProfilesCollection = collectionGroup(db, "userProfile");

		const querySnapshot = await getDocs(
			query(userMatchProfilesCollection, where("userId", "!=", userId))
		);
		const userMatchProfiles = querySnapshot.docs.map((doc) => ({
			...doc.data(),
		})) || [{}];

		setMatchProfiles(userMatchProfiles as UserProfile[]);
	}, []);

	useEffect(() => {
		if (!userId) return;
		const getProfiles = async () => {
			await getMatchProfilesCollection(userId);
		};

		getProfiles();
	}, [getMatchProfilesCollection, userId]);

	return { matchProfiles };
}
