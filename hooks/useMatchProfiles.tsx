import { db } from "@/firebase";
import type { UserProfile } from "@/lib/actions";
import { collectionGroup, getDocs, query } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";

export function useMatchProfiles(userId: string) {
	const [matchProfiles, setMatchProfiles] = useState<UserProfile[] | null>(
		null
	);

	const getMatchProfilesCollection = useCallback(async () => {
		const userMatchProfilesCollection = collectionGroup(db, "userProfile");

		const querySnapshot = await getDocs(query(userMatchProfilesCollection));
		const userMatchProfiles = querySnapshot.docs.map((doc) => ({
			...doc.data(),
		})) || [{}];

		const profiles = userMatchProfiles.filter(
			(profile) => profile.userId !== userId
		) as UserProfile[];
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
