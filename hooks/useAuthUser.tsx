import { auth, db, provider } from "@/firebase";
import type { UserProfile } from "@/models/auth";
import { ROUTES } from "@/routes/routes";
import { signInWithPopup } from "firebase/auth";
import { collection, getDocs, query } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function useAuthUser() {
  const [user, setUser] = useState<Partial<UserProfile> | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const authUser = result.user;

      const response = await getUserCollection(authUser);

      if (response?.profileCreated) {
        router.push(ROUTES.USER_PROFILE);
      } else {
        router.push(ROUTES.SET_UP_PROFILE);
      }
      setLoading(false);
    } catch (error) {
      const err = error as Error;
      setLoading(false);
      throw new Error(err.message);
    }
  };

  const getUserCollection = useCallback(async (authUser: UserProfile) => {
    const userProfileCollection = collection(
      db,
      "profiles",
      authUser.uid,
      "userProfile"
    );

    const querySnapshot = await getDocs(query(userProfileCollection));
    const [userData] = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    })) || [{}];

    setUser((prevUser) => {
      if (prevUser) {
        return {
          ...prevUser,
          ...userData,
        };
      }
      return { ...authUser, ...userData };
    });

    setLoading(false);
    return { ...authUser, ...userData };
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        getUserCollection(authUser);
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [getUserCollection]);

  return { user, signIn, loading };
}
