"use client";

import Login from "@/components/Login/Login";

export default function Home() {
  return (
    <div className="flex justify-center flex-col items-center h-screen">
      <h1 className="font-primary mb-2">Dreams</h1>
      <Login />
    </div>
  );
}
