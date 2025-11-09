import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

export const getSnapshot = async (userId: string) => {
  const userProfileDocument = doc(db, "profiles", userId);
  const snapshot = await getDoc(userProfileDocument);
  return snapshot;
};
