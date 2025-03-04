import { storage } from "@/firebase";
import { ref, uploadBytes } from "firebase/storage";

export async function uploadImage(
  image: File,
  imageRef: string,
  userId: string
) {
  const extension = image?.name.split(".").pop();

  if (!extension) {
    return;
  }

  const imagesDirectoryRef = ref(
    storage,
    `images/${userId}/${imageRef}.${extension}`
  );

  try {
    return await uploadBytes(imagesDirectoryRef, image);
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
