import { initialErrorState } from "@/components/DatingProfileForm/DatingProfileForm";
import { db } from "@/firebase";
import type { InitialErrorState } from "@/models/form";
import { addDoc, collection } from "firebase/firestore";
import { z } from "zod";

const datingProfileSchema = z.object({
  age: z
    .number({ required_error: "Age is required." })
    .min(18, "You must be at least 18 years old."),
  username: z.string({ required_error: "Username is required." }).min(3, {
    message: "Username must be at least 3 characters.",
  }),
  dream: z.string({
    required_error: "Dream is required.",
  }),
  gender: z.string({
    required_error: "Gender is required.",
  }),
});

export async function handleSetProfile(
  prevState: InitialErrorState,
  formData: FormData,
  userId?: string
) {
  const userProfile = {
    username: formData.get("username") || undefined,
    bio: formData.get("bio"),
    dream: formData.get("dream") || undefined,
    age: Number(formData.get("age")) || undefined,
    gender: formData.get("gender") || undefined,
    profileCreated: new Date().toISOString(),
  };

  const result = datingProfileSchema.safeParse(userProfile);

  if (userId && result.success) {
    addDoc(collection(db, "profiles", userId, "userProfile"), userProfile);
    return initialErrorState;
  }

  return result.error?.formErrors?.fieldErrors || initialErrorState;
}
