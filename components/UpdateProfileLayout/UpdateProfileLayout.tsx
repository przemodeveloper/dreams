"use client";

import { useManageUser } from "@/hooks/useManageUser";
import UpdateProfileForm from "../UpdateProfileForm/UpdateProfileForm";
import { useUserContext } from "@/context/user-context";
import UserProfileSkeleton from "../UserProfileSkeleton/UserProfileSkeleton";

export default function UpdateProfileLayout() {
	const { user } = useUserContext();

	const {
		uploadingImage,
		handleDeleteImage,
		handleUploadImage,
		handleUpdateUserProfile,
		userData,
		loading,
	} = useManageUser(user?.uid);

	return (
		<div className="flex justify-center items-center flex-col pt-4">
			{loading === "pending" && !userData ? (
				<UserProfileSkeleton />
			) : (
				<UpdateProfileForm
					userData={userData}
					userId={user?.uid}
					onUpdateUserProfile={handleUpdateUserProfile}
					uploadingImage={uploadingImage}
					onDeleteImage={handleDeleteImage}
					onUploadImage={handleUploadImage}
				/>
			)}
		</div>
	);
}
