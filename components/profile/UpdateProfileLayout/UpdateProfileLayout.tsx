"use client";

import { useManageUser } from "@/hooks/useManageUser";
import UpdateProfileForm from "../UpdateProfileForm/UpdateProfileForm";
import UserProfileSkeleton from "../UserProfileSkeleton/UserProfileSkeleton";
import { LOADING_STATE } from "@/constants/user-profile";
import { useUserStore } from "@/hooks/useUserStore";

export default function UpdateProfileLayout() {
	const { profile, loading } = useUserStore((state) => state);

	const {
		handleUpdateUserProfile,
		uploadingImages,
		handleDeleteImage,
		handleUploadImage,
	} = useManageUser(profile?.userId);

	return (
		<div className="flex justify-center items-center flex-col pt-4">
			{loading === LOADING_STATE.PENDING && !profile ? (
				<UserProfileSkeleton />
			) : profile ? (
				<UpdateProfileForm
					userData={profile}
					userId={profile?.userId}
					onUpdateUserProfile={handleUpdateUserProfile}
					uploadingImages={uploadingImages}
					onDeleteImage={handleDeleteImage}
					onUploadImage={handleUploadImage}
				/>
			) : null}
		</div>
	);
}
