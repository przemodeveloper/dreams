import { db, storage } from "@/firebase";
import type { UserProfile } from "@/models/auth";
import { uploadImage } from "@/utils/uploadImage";
import {
	collection,
	doc,
	getDocs,
	onSnapshot,
	updateDoc,
} from "firebase/firestore";
import { deleteObject, getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";

export interface ImageObject {
	filePath: string;
	downloadUrl: string;
	imageRefId: string;
}

export interface UploadingImage {
	loading: "idle" | "pending" | "resolved" | "error";
	imageRefId: string | null;
}

export function useSubscribeUserProfile(userId: string) {
	const [userData, setUserData] = useState<Partial<UserProfile> | null>(null);

	useEffect(() => {
		if (!userId) return;

		const getProfileDocRef = async () => {
			const userProfileCollection = collection(
				db,
				"profiles",
				userId,
				"userProfile"
			);
			const snapshot = await getDocs(userProfileCollection);
			if (snapshot.empty) throw new Error("User profile not found");
			const userProfileDocId = snapshot.docs[0].id;
			return doc(db, "profiles", userId, "userProfile", userProfileDocId);
		};

		let unsubscribe: () => void;

		getProfileDocRef().then((profileDocRef) => {
			unsubscribe = onSnapshot(profileDocRef, (docSnap) => {
				const data = docSnap.data();
				setUserData((data as Partial<UserProfile>) || null);
			});
		});

		return () => unsubscribe?.();
	}, [userId]);

	return { userData };
}

export function useManageImages(userImages?: ImageObject[], userId?: string) {
	const [images, setImages] = useState<ImageObject[]>(userImages || []);
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

	const { userData } = useSubscribeUserProfile(userId || "");

	useEffect(() => {
		if (userData?.images) {
			setImages(userData.images);
		}
	}, [userData?.images]);

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
			images: images.map((image) =>
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
					images: images.map((image) =>
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
		images,
		uploadingImage,
		handleUploadImage,
		handleDeleteImage,
	};
}
