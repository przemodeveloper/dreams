"use client";

import { useManageUser } from "@/hooks/useManageUser";
import UpdateProfileForm from "../UpdateProfileForm/UpdateProfileForm";
import { useUserContext } from "@/context/user-context";
import UserProfileSkeleton from "../UserProfileSkeleton/UserProfileSkeleton";
import { LOADING_STATE } from "@/constants/user-profile";
export default function UpdateProfileLayout() {
	const { user, loading, userId } = useUserContext();

	const {
		handleUpdateUserProfile,
		uploadingImages,
		handleDeleteImage,
		handleUploadImage,
	} = useManageUser(user?.userId);

	return (
		<div className="flex justify-center items-center flex-col pt-4">
			{loading === LOADING_STATE.PENDING && !user ? (
				<UserProfileSkeleton />
			) : userId && user ? (
				<UpdateProfileForm
					userData={user}
					userId={user?.userId}
					onUpdateUserProfile={handleUpdateUserProfile}
					uploadingImages={uploadingImages}
					onDeleteImage={handleDeleteImage}
					onUploadImage={handleUploadImage}
				/>
			) : null}
		</div>
	);
}
