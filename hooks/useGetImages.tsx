import { storage } from "@/firebase";
import { uploadImage } from "@/utils/uploadImage";
import { deleteObject, getDownloadURL, listAll, ref } from "firebase/storage";
import { useEffect, useState } from "react";

interface ImageObject {
	filePath: string;
	downloadUrl: string;
}

export function useGetImages(imageRefIds: string[], userId?: string) {
	const [images, setImages] = useState<ImageObject[]>([]);
	const [loading, setLoading] = useState("pending");

	const handleUploadImage = async (
		file: File,
		imageRefId: string,
		index: number,
		userId?: string
	) => {
		if (!userId) return;
		const res = await uploadImage(file, imageRefId, userId);

		const imageRef = ref(storage, res?.metadata.fullPath);
		const downloadUrl = await getDownloadURL(imageRef);

		const userImages = [...images];
		if (!res) return;
		userImages[index] = { filePath: res?.metadata.fullPath, downloadUrl };
		setImages(userImages);
	};

	console.log(images);

	const handleDeleteImage = async (filePath: string) => {
		const userImages = [...images];
		const deletedImageIndex = images.findIndex(
			(image) => image.filePath === filePath
		);
		userImages[deletedImageIndex] = { filePath: "", downloadUrl: "" };

		setImages(userImages);
		const imageRef = ref(storage, filePath);

		await deleteObject(imageRef)
			.then(() => {
				// TO DO: Replace with toast notification
				console.log("File deleted successfully");
			})
			.catch((error) => {
				// TO DO: Replace with toast notification
				console.error("Error deleting file", error);
			});
	};

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
						if (!filePath) return { filePath: "", downloadUrl: "" };
						try {
							const imagesRef = ref(storage, filePath);
							const downloadUrl = await getDownloadURL(imagesRef);

							return { filePath, downloadUrl };
						} catch {
							return { filePath: "", downloadUrl: "" };
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

	return { images, loading, handleUploadImage, handleDeleteImage };
}
