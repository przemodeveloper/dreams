import { auth, db, provider } from "@/firebase";
import { signInWithPopup, type User } from "firebase/auth";
import { collection, getDocs, query } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface UserProfile extends User {
  username?: string;
  bio?: string;
  age?: number;
  gender?: string;
}

export default function useAuthUser() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const router = useRouter();

  const signIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      router.push("/set-up-profile");
    } catch (error) {
      const err = error as Error;
      throw new Error(err.message);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        const baseUser: UserProfile = {
          ...authUser,
        };

        setUser(baseUser);

        const userProfileCollection = collection(
          db,
          "profiles",
          authUser.uid,
          "userProfile"
        );

        async function getCollection() {
          const querySnapshot = await getDocs(query(userProfileCollection));
          const [userData] = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
          }));

          setUser((prevUser) => {
            if (prevUser) {
              return {
                ...prevUser,
                ...userData,
              };
            }
            return { ...baseUser, ...userData };
          });
        }

        getCollection();
      }
    });

    return () => unsubscribe();
  }, []);

  return { user, signIn };
}
