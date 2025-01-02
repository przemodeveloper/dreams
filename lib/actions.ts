import { initialErrorState } from "@/components/DatingProfileForm/DatingProfileForm";
import { db } from "@/firebase";
import { addDoc, collection } from "firebase/firestore";

export async function handleSetProfile(
  prevState: typeof initialErrorState,
  formData: FormData,
  userId?: string
) {
  const userProfile = {
    username: formData.get("username"),
    bio: formData.get("bio"),
    dream: formData.get("dream"),
    age: formData.get("age"),
    gender: formData.get("gender"),
    profileCreated: new Date().toISOString(),
  };

  if (userId) {
    addDoc(collection(db, "profiles", userId, "userProfile"), userProfile);
  }

  return initialErrorState;
}
