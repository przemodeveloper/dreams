import { auth, db, provider } from "@/firebase";
import { signInWithPopup, type User } from "firebase/auth";
import { collection, getDocs, query } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface UserProfile extends User {
  username?: string;
  bio?: string;
  dream?: string;
  age?: number;
  gender?: string;
  profileCreated?: string;
}

export default function useAuthUser() {
  const [user, setUser] = useState<Partial<UserProfile> | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const authUser = result.user;
      const baseUser: UserProfile = { ...authUser };

      const response = await getUserCollection(authUser, baseUser);

      if (response?.profileCreated) {
        router.push("/user-profile");
      } else {
        router.push("/set-up-profile");
      }
      setLoading(false);
    } catch (error) {
      const err = error as Error;
      setLoading(false);
      throw new Error(err.message);
    }
  };

  const getUserCollection = useCallback(
    async (authUser: UserProfile, baseUser: UserProfile) => {
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
        return { ...baseUser, ...userData };
      });

      setLoading(false);
      return { ...baseUser, ...userData };
    },
    []
  );

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        const baseUser: UserProfile = {
          ...authUser,
        };

        setUser(baseUser);

        getUserCollection(authUser, baseUser);
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [getUserCollection]);

  return { user, signIn, loading };
}
