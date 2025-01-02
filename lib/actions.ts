import { initialFormState } from "@/components/DatingProfileForm/DatingProfileForm";
import { db } from "@/firebase";
import type { InitialFormState } from "@/models/form";
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
  prevState: InitialFormState,
  formData: FormData,
  userId?: string
) {
  const userProfile = {
    username: String(formData.get("username")) || undefined,
    bio: String(formData.get("bio")) || undefined,
    dream: String(formData.get("dream")) || undefined,
    age: Number(formData.get("age")) || undefined,
    gender: String(formData.get("gender")) || undefined,
    profileCreated: new Date().toISOString(),
  };

  const result = datingProfileSchema.safeParse(userProfile);

  if (userId && result.success) {
    addDoc(collection(db, "profiles", userId, "userProfile"), userProfile);
    return initialFormState;
  }

  return {
    formValues: userProfile || initialFormState.formValues,
    formErrors:
      result.error?.formErrors?.fieldErrors || initialFormState.formErrors,
  };
}
