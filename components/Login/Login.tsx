"use client";

import useAuthUser from "@/hooks/useAuthUser";
import { RiGoogleFill } from "@remixicon/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
  const router = useRouter();
  const { user, signIn } = useAuthUser();

  const handleSignIn = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    await signIn();
  };

  useEffect(() => {
    if (user?.profileCreated) {
      router.push("/user-profile");
    } else {
      router.push("/set-up-profile");
    }
  }, [user, router]);

  return (
    <button type="button" className="text-lg" onClick={handleSignIn}>
      Sign in with <RiGoogleFill className="inline-block" />
    </button>
  );
}
