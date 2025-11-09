import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { authToken } = await req.json();

  if (!authToken) return new Response("No authToken", { status: 400 });

  (await cookies()).set("authToken", authToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  });

  return new Response("authToken set", { status: 200 });
}

export async function DELETE() {
  (await cookies()).delete("authToken");

  return new Response("authToken deleted", { status: 200 });
}
