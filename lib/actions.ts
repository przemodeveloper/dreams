import { initialFormState } from "@/components/DatingProfileForm/datingProfile.consts";
import { imageRefIds } from "@/constants/user-profile";
import { db, storage } from "@/firebase";
import type { ImageObject } from "@/hooks/useManageUser";
import type { InitialFormState } from "@/models/form";
import { uploadImage } from "@/utils/uploadImage";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
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
  location: z.object({
    address: z.string({
      required_error: "Address is required.",
    }),
    coords: z.object({
      lat: z.number().optional(),
      lng: z.number().optional(),
    }),
  }).required()
});

export async function handleSetProfile(
  prevState: InitialFormState,
  formData: FormData,
  location: {
    address: string;
    coords: {
      latitude: number;
      longitude: number;
    }
  } | null,
  userId?: string,
) {
  const userProfile = {
    username: String(formData.get("username")) || undefined,
    bio: String(formData.get("bio")) || "",
    dream: String(formData.get("dream")) || undefined,
    age: Number(formData.get("age")) || undefined,
    gender: String(formData.get("gender")) || undefined,
    orientation: String(formData.get("orientation")) || undefined,
    profileCreated: new Date().toISOString(),
    location,
    userId,
  };

  const userImages = imageRefIds
    .map((key) => {
      const file = formData.get(key) as File;
      return file?.size > 0 ? { key, file } : { key };
    })
    .filter(Boolean);

  const result = datingProfileSchema.safeParse(userProfile);

  console.log(userProfile)

  if (userId && result?.success) {
    const images: ImageObject[] = [];

    if (userImages.length > 0) {

      await Promise.all(
        userImages.map(async (image) => {
          if (image?.file) {
            const res = await uploadImage(image.file, image.key, userId);
            const imageRef = ref(storage, res?.metadata.fullPath);
            const url = await getDownloadURL(imageRef);

            if (url) {
              images.push({
                filePath: res?.metadata.fullPath || "",
                downloadUrl: url,
                imageRefId: image.key,
              });
            }
          } else {
            images.push({
              filePath: "",
              downloadUrl: "",
              imageRefId: image.key,
            });
          }
        })
      );
    }
    await addDoc(
      collection(db, "profiles", userId, "userProfile"),
      {...userProfile, images: images.sort((a, b) => a.imageRefId.localeCompare(b.imageRefId))},
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
