import { db } from "@/firebase";
import type { UserProfile } from "@/lib/actions";
import { collectionGroup, getDocs, query, where } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";

export function useMatchProfiles(userId: string) {
	const [matchProfiles, setMatchProfiles] = useState<UserProfile[] | null>(
		null
	);

	const getMatchProfilesCollection = useCallback(async () => {
		const userMatchProfilesCollection = collectionGroup(db, "userProfile");

		const q = query(userMatchProfilesCollection, where("userId", "!=", userId));

		const querySnapshot = await getDocs(q);

		const profiles = querySnapshot.docs.map((doc) => ({
			...doc.data(),
		})) as UserProfile[];

		setMatchProfiles(profiles);
	}, [userId]);

	useEffect(() => {
		const getProfiles = async () => {
			await getMatchProfilesCollection();
		};

		getProfiles();
	}, [getMatchProfilesCollection]);

	return { matchProfiles };
}
