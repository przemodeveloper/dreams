"use client";

import Login from "@/components/Login/Login";
import useAuthUser from "@/hooks/useAuthUser";

export default function Home() {
  const { user, loading } = useAuthUser();

  return (
    <>
      {user?.profileCreated && !loading ? null : (
        <div className="flex justify-center flex-col items-center h-screen">
          <h1 className="font-primary mb-2">Dreams</h1>
          <Login />
        </div>
      )}
    </>
  );
}
