"use client";

import { useManageUser } from "@/hooks/useManageUser";
import UpdateProfileForm from "../UpdateProfileForm/UpdateProfileForm";
import { useUserContext } from "@/context/user-context";
import UserProfileSkeleton from "../UserProfileSkeleton/UserProfileSkeleton";

export default function UpdateProfileLayout() {
	const { user, loading, isLoggedIn } = useUserContext();

	const {
		handleUpdateUserProfile,
		uploadingImage,
		handleDeleteImage,
		handleUploadImage,
	} = useManageUser(user?.userId, user);

	return (
		<div className="flex justify-center items-center flex-col pt-4">
			{loading === "pending" && !user ? (
				<UserProfileSkeleton />
			) : isLoggedIn && user ? (
				<UpdateProfileForm
					userData={user}
					userId={user?.userId}
					onUpdateUserProfile={handleUpdateUserProfile}
					uploadingImage={uploadingImage}
					onDeleteImage={handleDeleteImage}
					onUploadImage={handleUploadImage}
				/>
			) : null}
		</div>
	);
}
