import { cookies } from "next/headers";
import { adminAuth } from "@/firebaseAdmin";

export async function verifyIdToken() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("authToken")?.value;

  if (!authToken) return null;

  try {
    const decodedToken = await adminAuth.verifyIdToken(authToken);
    return decodedToken;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}