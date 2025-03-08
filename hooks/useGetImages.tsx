import { storage } from "@/firebase";
import { uploadImage } from "@/utils/uploadImage";
import { deleteObject, getDownloadURL, listAll, ref } from "firebase/storage";
import { useEffect, useState } from "react";

interface ImageObject {
	filePath: string;
	downloadUrl: string;
	imageRefId: string;
}

export interface UploadingImage {
	loading: "idle" | "pending" | "resolved" | "error";
	imageRefId: string | null;
}

export function useGetImages(imageRefIds: string[], userId?: string) {
	const [images, setImages] = useState<ImageObject[]>([]);
	const [downloadingImages, setDownloadingImages] = useState("pending");
	const [uploadingImage, setUploadingImage] = useState<UploadingImage>({
		loading: "idle",
		imageRefId: null,
	});

	const handleUploadImage = async (
		file: File,
		imageRefId: string,
		userId?: string
	) => {
		if (!userId) return;
		setUploadingImage({ loading: "pending", imageRefId });
		const res = await uploadImage(file, imageRefId, userId);

		const imageRef = ref(storage, res?.metadata.fullPath);
		const downloadUrl = await getDownloadURL(imageRef);

		if (!res) return;

		setImages((prevState) => {
			return prevState.map((image) =>
				imageRefId === image.imageRefId
					? { filePath: res?.metadata.fullPath, downloadUrl, imageRefId }
					: image
			);
		});
		setUploadingImage({ loading: "resolved", imageRefId });
	};

	const handleDeleteImage = async (filePath: string) => {
		setImages((prevState) => {
			return prevState.map((image) =>
				image.filePath === filePath
					? { filePath: "", downloadUrl: "", imageRefId: image.imageRefId }
					: image
			);
		});

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
						if (!filePath) return { filePath: "", downloadUrl: "", imageRefId };
						try {
							const imagesRef = ref(storage, filePath);
							const downloadUrl = await getDownloadURL(imagesRef);

							return { filePath, downloadUrl, imageRefId };
						} catch {
							return { filePath: "", downloadUrl: "", imageRefId };
						}
					})
				);

				setImages(urls);
				setDownloadingImages("resolved");
			} catch {
				setDownloadingImages("error");
			}
		}

		downloadImagesUrls();
	}, [imageRefIds, userId]);

	return {
		images,
		downloadingImages,
		uploadingImage,
		handleUploadImage,
		handleDeleteImage,
	};
}
