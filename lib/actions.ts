import { initialFormState } from "@/components/DatingProfileForm/datingProfile.consts";
import { db } from "@/firebase";
import type { InitialFormState } from "@/models/form";
import { addDoc, collection } from "firebase/firestore";
import { z } from "zod";

// const image = formData.get("image") as File;
// const extension = image?.name.split(".").pop();

// if (!extension) {
//   return;
// }

// const imagesDirectoryRef = ref(
//   storage,
//   `images/${userId}/profile.${extension}`
// );

// uploadBytes(imagesDirectoryRef, image)
//   .then(() => {
//     console.log("Uploaded file to directory!");
//   })
//   .catch((error) => {
//     console.error("Error uploading file:", error);
//   });

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

export function handleSetProfile(
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

  const result = datingProfileSchema.safeParse(userProfile);

  if (userId && result.success) {
    addDoc(collection(db, "profiles", userId, "userProfile"), userProfile);
    return {
      ...initialFormState,
      success: true,
    };
  }

  return {
    success: result.success,
    formValues: userProfile || initialFormState.formValues,
    formErrors:
      result.error?.formErrors?.fieldErrors || initialFormState.formErrors,
  };
}
