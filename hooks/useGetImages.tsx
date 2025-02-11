import { storage } from "@/firebase";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { useEffect, useState } from "react";

export function useGetImages(imageRefIds: string[], userId?: string) {
	const [images, setImages] = useState<(string | null)[]>([]);
	const [loading, setLoading] = useState("pending");

	useEffect(() => {
		if (!userId || !imageRefIds) {
			return;
		}

		async function downloadImagesUrls() {
			try {
				const folderRef = ref(storage, `images/${userId}`);
				const fileList = await listAll(folderRef);

				const fileMap = new Map(
					fileList.items.map((item) => [item.name.split(".")[0], item.fullPath])
				);

				const urls = await Promise.all(
					imageRefIds.map(async (imageRefId) => {
						const filePath = fileMap.get(imageRefId);
						if (!filePath) return null;
						try {
							const imagesRef = ref(storage, filePath);
							return await getDownloadURL(imagesRef);
						} catch {
							return null;
						}
					})
				);

				setImages(urls);
				setLoading("resolved");
			} catch {
				setLoading("error");
			}
		}

		downloadImagesUrls();
	}, [imageRefIds, userId]);

	return { images, loading };
}
