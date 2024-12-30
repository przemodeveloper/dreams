"use client";

import { auth, provider } from "@/firebase";
import useUserData from "@/hooks/useUserData";
import { RiGoogleFill } from "@remixicon/react";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
  const router = useRouter();
  const user = useUserData();

  const signIn = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      await signInWithPopup(auth, provider);
      router.push("/user");
    } catch (error) {
      const err = error as Error;
      throw new Error(err.message);
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/user");
    }
  }, [user, router]);

  return (
    <button type="button" className="text-lg" onClick={signIn}>
      Sign in with <RiGoogleFill className="inline-block" />
    </button>
  );
}
