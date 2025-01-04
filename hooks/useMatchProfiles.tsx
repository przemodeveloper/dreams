import { db } from "@/firebase";
import type { UserProfile } from "@/models/auth";
import { collectionGroup, getDocs, query } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";

export function useMatchProfiles() {
  const [matchProfiles, setMatchProfiles] = useState<
    Partial<UserProfile>[] | null
  >(null);

  const getMatchProfilesCollection = useCallback(async () => {
    const userMatchProfilesCollection = collectionGroup(db, "userProfile");

    const querySnapshot = await getDocs(query(userMatchProfilesCollection));
    const [userMatchProfiles] = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    })) || [{}];
  }, []);

  useEffect(() => {
    const getProfiles = async () => {
      await getMatchProfilesCollection();
    };

    getProfiles();
  }, [getMatchProfilesCollection]);
}
