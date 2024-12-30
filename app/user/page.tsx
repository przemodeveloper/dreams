"use client";

import useUserData from "@/hooks/useUserData";

export default function UserProfilePage() {
  const user = useUserData();

  return (
    <div>
      <h1>User Profile</h1>
    </div>
  );
}
