import { initialFormState } from "@/components/DatingProfileForm/datingProfile.consts";
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
  };

  const userImages = [
    (formData.get("profile_image_1") as File)?.size > 0 && {
      profile_image_1: formData.get("profile_image_1"),
    },
    (formData.get("profile_image_2") as File)?.size > 0 && {
      profile_image_2: formData.get("profile_image_2"),
    },
    (formData.get("profile_image_3") as File)?.size > 0 && {
      profile_image_3: formData.get("profile_image_3"),
    },
  ].filter(Boolean);

  const result = datingProfileSchema.safeParse(userProfile);

  if (userId) {
    if (userImages.length > 0) {
      for (const image of userImages) {
        const key = Object.keys(image)[0] as keyof typeof image;
        const file = image[key] as File;
        const imageRef = key;
        await uploadImage(file, imageRef, userId);
      }
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
