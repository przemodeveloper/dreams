import { storage } from "@/firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";

export function useGetImages(imageRefIds: string[], userId?: string) {
  const [images, setImages] = useState<(string | null)[]>([]);

  useEffect(() => {
    if (!userId || !imageRefIds) {
      return;
    }

    async function downloadImagesUrls() {
      const urls = await Promise.all(
        imageRefIds.map(async (imageRefId) => {
          const imagesRef = ref(storage, `images/${userId}/${imageRefId}.jpg`);

          try {
            return await getDownloadURL(imagesRef);
          } catch (error) {
            return null;
          }
        })
      );

      setImages(urls);
    }

    downloadImagesUrls();
  }, [imageRefIds, userId]);

  return { images };
}
