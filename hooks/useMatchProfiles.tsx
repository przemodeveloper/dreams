import { db } from "@/firebase";
import type { UserProfile } from "@/lib/actions";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";

type MatchProfile = Omit<UserProfile, "location">;

export function useMatchProfiles(userId?: string) {
  const [matchProfiles, setMatchProfiles] = useState<MatchProfile[] | null>(
    null
  );

  const getMatchProfilesCollection = useCallback(async (userId: string) => {
    const userMatchProfilesCollection = collection(db, "profiles");
    const q = query(
      userMatchProfilesCollection,
      where("userId", "not-in", [userId]),
      orderBy("userId")
    );
    const querySnapshot = await getDocs(q);
    const userMatchProfiles = querySnapshot.docs.map((doc) => {
      const { location: _location, ...profile } = doc.data() as UserProfile;
      return profile;
    });

    setMatchProfiles(userMatchProfiles);
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
