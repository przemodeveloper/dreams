import { db, storage } from "@/firebase";
import { uploadImage } from "@/utils/uploadImage";
import {
	collection,
	doc,
	getDoc,
	getDocs,
	updateDoc,
} from "firebase/firestore";
import { deleteObject, getDownloadURL, ref } from "firebase/storage";
import { useState } from "react";
import type { Field } from "@/models/form";
import { useNotificationContext } from "@/context/notification-context";
import { LOADING_STATE, type LoadingState } from "@/constants/user-profile";

export interface ImageObject {
	filePath: string;
	downloadUrl: string;
	imageRefId: string;
}

export interface UploadingImage {
	loading: LoadingState;
	imageRefId: string | null;
}

export function useManageUser(userId?: string) {
	const [uploadingImages, setUploadingImages] = useState<
		Record<string, LoadingState>
	>({});

	const { notify } = useNotificationContext();

	const getProfileDocRef = async (userId: string) => {
		const userProfileCollection = collection(
			db,
			"profiles",
			userId,
			"userProfile"
		);

		const snapshot = await getDocs(userProfileCollection);

		const userProfileDocId = snapshot.docs[0].id;

		const profileDocRef = doc(
			db,
			"profiles",
			userId,
			"userProfile",
			userProfileDocId
		);
		return profileDocRef;
	};

	const handleUpdateUserProfile = async (
		field: Field | "location",
		value: string | object
	) => {
		if (!userId) return;

		const profileDocRef = await getProfileDocRef(userId);

		await updateDoc(profileDocRef, {
			[field]: value,
		});
	};

	const handleUploadImage = async (
		file: File,
		imageRefId: string,
		userId?: string
	) => {
		if (!userId) return;

		try {
			setUploadingImages((prev) => ({
				...prev,
				[imageRefId]: LOADING_STATE.PENDING,
			}));

			const res = await uploadImage(file, imageRefId, userId);
			if (!res) return;

			const profileDocRef = await getProfileDocRef(userId);

			const currentDoc = await getDoc(profileDocRef);
			const currentImages = currentDoc.data()?.images || [];

			const imageRef = ref(storage, res?.metadata.fullPath);
			const downloadUrl = await getDownloadURL(imageRef);

			const updatedImages = currentImages.map((image: ImageObject) =>
				imageRefId === image.imageRefId
					? { filePath: res?.metadata.fullPath, downloadUrl, imageRefId }
					: image
			);

			await updateDoc(profileDocRef, {
				images: updatedImages,
			});

			notify("Image uploaded successfully!");

			setUploadingImages((prev) => ({
				...prev,
				[imageRefId]: LOADING_STATE.RESOLVED,
			}));
		} catch (error) {
			setUploadingImages((prev) => ({
				...prev,
				[imageRefId]: LOADING_STATE.REJECTED,
			}));

			notify(
				`Something went wrong while uploading image: ${
					(error as Error).message
				}`
			);
		}
	};

	const handleDeleteImage = async (filePath: string) => {
		if (!userId) return;

		const profileDocRef = await getProfileDocRef(userId);

		const currentDoc = await getDoc(profileDocRef);
		const currentImages = currentDoc.data()?.images || [];

		const imageRef = ref(storage, filePath);

		try {
			await deleteObject(imageRef);

			const updatedImages = currentImages.map((image: ImageObject) =>
				image.filePath === filePath
					? { filePath: "", downloadUrl: "", imageRefId: image.imageRefId }
					: image
			);

			await updateDoc(profileDocRef, {
				images: updatedImages,
			});

			notify("Image deleted successfully!");
		} catch (error: unknown) {
			notify(
				`Something went wrong while deleting image: ${
					error instanceof Error ? error.message : "Unknown error"
				}`
			);
		}
	};

	return {
		uploadingImages,
		handleUploadImage,
		handleDeleteImage,
		handleUpdateUserProfile,
	};
}
