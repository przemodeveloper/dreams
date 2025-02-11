import { initialFormState } from "@/components/DatingProfileForm/datingProfile.consts";
import { imageRefIds } from "@/constants/user-profile";
import { db } from "@/firebase";
import type { InitialFormState } from "@/models/form";
import { uploadImage } from "@/utils/uploadImage";
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
  orientation: z.string({
    required_error: "Sexual orientation is required.",
  }),
});

export async function handleSetProfile(
  prevState: InitialFormState,
  formData: FormData,
  userId?: string
) {
  const userProfile = {
    username: String(formData.get("username")) || undefined,
    bio: String(formData.get("bio")) || "",
    dream: String(formData.get("dream")) || undefined,
    age: Number(formData.get("age")) || undefined,
    gender: String(formData.get("gender")) || undefined,
    orientation: String(formData.get("orientation")) || undefined,
    profileCreated: new Date().toISOString(),
    userId,
  };

  const userImages = imageRefIds
    .map((key) => {
      const file = formData.get(key) as File;
      return file?.size > 0 ? { key, file } : null;
    })
    .filter(Boolean);

  const result = datingProfileSchema.safeParse(userProfile);

  if (userId && result?.success) {
    if (userImages.length > 0) {
      await Promise.all(
        userImages.map(async (image) => {
          if (image) {
            await uploadImage(image.file, image.key, userId);
          }
        })
      );
    }
    await addDoc(
      collection(db, "profiles", userId, "userProfile"),
      userProfile
    );
    return {
      ...initialFormState,
      success: true,
    };
  }

  return {
    success: result?.success,
    formValues: userProfile || initialFormState.formValues,
    formErrors:
      result.error?.formErrors?.fieldErrors || initialFormState.formErrors,
  };
}
