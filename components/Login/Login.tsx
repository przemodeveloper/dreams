"use client";

import useAuthUser from "@/hooks/useAuthUser";
import { RiGoogleFill } from "@remixicon/react";

export default function Login() {
  const { signIn } = useAuthUser();

  const handleSignIn = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    await signIn();
  };

  return (
    <button type="button" className="text-lg" onClick={handleSignIn}>
      Sign in with <RiGoogleFill className="inline-block" />
    </button>
  );
}
