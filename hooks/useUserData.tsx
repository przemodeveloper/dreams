import { auth } from "@/firebase";
import type { User } from "firebase/auth";
import { useEffect, useState } from "react";

export default function useUserData() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return user;
}
