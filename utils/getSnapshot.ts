import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";

export const getSnapshot = async (userId: string) => {
  const userProfileCollection = collection(
    db,
    "profiles",
    userId,
    "userProfile"
  );
  const snapshot = await getDocs(userProfileCollection);
  return snapshot;
};