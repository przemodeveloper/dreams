import { db, storage } from "@/firebase";
import { uploadImage } from "@/utils/uploadImage";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref } from "firebase/storage";
import { useState } from "react";
import { useSubscribeUserProfile } from "./useSubscribeUserProfile";
import { Field } from "@/app/user-profile/page";

export interface ImageObject {
	filePath: string;
	downloadUrl: string;
	imageRefId: string;
}

export interface UploadingImage {
	loading: "idle" | "pending" | "resolved" | "error";
	imageRefId: string | null;
}

export function useManageUser(userId?: string) {
	const [uploadingImage, setUploadingImage] = useState<UploadingImage>({
		loading: "idle",
		imageRefId: null,
	});

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

	const { userData, loading } = useSubscribeUserProfile(userId || "");

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

		setUploadingImage({ loading: "pending", imageRefId });

		const res = await uploadImage(file, imageRefId, userId);

		const profileDocRef = await getProfileDocRef(userId);

		const imageRef = ref(storage, res?.metadata.fullPath);
		const downloadUrl = await getDownloadURL(imageRef);

		if (!res) return;

		await updateDoc(profileDocRef, {
			images: userData?.images?.map((image) =>
				imageRefId === image.imageRefId
					? { filePath: res?.metadata.fullPath, downloadUrl, imageRefId }
					: image
			),
		});

		setUploadingImage({ loading: "resolved", imageRefId });
	};

	const handleDeleteImage = async (filePath: string) => {
		if (!userId) return;

		const profileDocRef = await getProfileDocRef(userId);

		const imageRef = ref(storage, filePath);

		await deleteObject(imageRef)
			.then(async () => {
				await updateDoc(profileDocRef, {
					images: userData?.images?.map((image) =>
						image.filePath === filePath
							? { filePath: "", downloadUrl: "", imageRefId: image.imageRefId }
							: image
					),
				});

				// TO DO: Replace with toast notification
				console.log("File deleted successfully");
			})
			.catch((error) => {
				// TO DO: Replace with toast notification
				console.error("Error deleting file", error);
			});
	};

	return {
		uploadingImage,
		handleUploadImage,
		handleDeleteImage,
		handleUpdateUserProfile,
		userData,
		loading,
	};
}
