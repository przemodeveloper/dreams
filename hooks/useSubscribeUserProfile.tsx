import { db } from "@/firebase";
import { LOADING_STATE, type LoadingState } from "@/constants/user-profile";
import type { FirestoreError } from "firebase/firestore";
import { collection, doc, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import type { UserProfile } from "@/lib/actions";

export function useSubscribeUserProfile(userId: string) {
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<LoadingState>(LOADING_STATE.PENDING);

  useEffect(() => {
    if (!userId) return;

    const userProfileDoc = doc(db, "profiles", userId);

    const unsubscribe = onSnapshot(
      userProfileDoc,
      (snapshot) => {
        if (!snapshot.exists()) {
          setUserData(null);
          setLoading(LOADING_STATE.RESOLVED);
          return;
        }

        const docData = snapshot.data();
        setUserData(docData as UserProfile);
        setLoading(LOADING_STATE.RESOLVED);
      },
      (error: FirestoreError) => {
        console.error("Error subscribing to user profile:", error.message);
        setLoading(LOADING_STATE.REJECTED);
      }
    );

    return () => {
      unsubscribe();
      setUserData(null);
    };
  }, [userId]);

  return { userData, loading };
}
