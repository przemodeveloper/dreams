"use client";

import ImagePreview from "@/components/ImagePreview/ImagePreview";
import UserProfileSkeleton from "@/components/UserProfileSkeleton/UserProfileSkeleton";
import { OPTIONS } from "@/constants/user-profile";
import { useNotificationContext } from "@/context/notification-context";
import { useManageUser } from "@/hooks/useManageUser";
import { useUserLocation } from "@/hooks/useUserLocation";
import type { Field } from "@/models/form";
import { RiRefreshLine } from "@remixicon/react";
import { EditableField } from "../EditableField/EditableField";
import { useUserContext } from "@/context/user-context";

export default function UpdateProfileForm() {
	const { user } = useUserContext();

	const { notify } = useNotificationContext();

	const {
		uploadingImage,
		handleDeleteImage,
		handleUploadImage,
		handleUpdateUserProfile,
		userData,
		loading,
	} = useManageUser(user?.uid);

	const { loading: loadingLocation, getUserLocation } = useUserLocation({
		skipOnMount: true,
	});

	const location = userData?.location;

	const handleUpdateLocation = async () => {
		const result = await getUserLocation();
		if (result?.location) {
			await handleUpdateUserProfile("location", result?.location);
			notify("Location synced successfully!");
		} else if (result?.error) {
			notify(result.error);
		}
	};

	const handleSave = async (field: Field, value: string, label: string) => {
		await handleUpdateUserProfile(field, value);
		notify(`${label} updated successfully!`);
	};

	return (
		<div className="flex justify-center items-center flex-col pt-4">
			{!userData && loading === "pending" ? (
				<UserProfileSkeleton />
			) : (
				<>
					<div className="relative w-full md:w-2/3 lg:w-1/2 grid grid-cols-3 gap-3 mb-4">
						{userData?.images?.map((image) => (
							<ImagePreview
								key={image.imageRefId}
								imageRefId={image.imageRefId}
								uploadingImage={uploadingImage}
								onDeleteImage={handleDeleteImage}
								onUploadImage={async (file) =>
									await handleUploadImage(file, image.imageRefId, user?.uid)
								}
								filePath={image.filePath}
								imgSrc={image.downloadUrl}
								userId={user?.uid}
								alt={image.imageRefId}
							/>
						))}
					</div>
					<div className="flex items-center flex-col w-2/3 lg:w-1/3 mx-auto">
						<div className="mb-3 w-full">
							<EditableField
								field="username"
								label="Username"
								type="text"
								component="input"
								initialValue={userData?.username || ""}
								onSave={handleSave}
								className="text-3xl"
								showLabel={false}
							/>
						</div>

						<div className="mb-3 w-full">
							<EditableField
								field="bio"
								label="Bio"
								type="text"
								className="text-lg"
								component="textarea"
								initialValue={userData?.bio || ""}
								onSave={handleSave}
							/>
						</div>

						<div className="mb-3 w-full">
							<EditableField
								field="age"
								label="Age"
								type="number"
								min={18}
								component="input"
								initialValue={String(userData?.age)}
								onSave={handleSave}
								className="text-lg"
							/>
						</div>

						<div className="mb-3 w-full">
							<EditableField
								field="dream"
								label="Dream"
								component="select"
								initialValue={userData?.dream || ""}
								onSave={handleSave}
								options={OPTIONS.dream}
							/>
						</div>

						<div className="mb-3 w-full">
							<EditableField
								field="gender"
								label="Gender"
								component="select"
								initialValue={userData?.gender || ""}
								onSave={handleSave}
								options={OPTIONS.gender}
								className="text-lg"
							/>
						</div>

						<div className="mb-3 w-full">
							<EditableField
								field="orientation"
								label="Orientation"
								component="select"
								initialValue={userData?.orientation || ""}
								onSave={handleSave}
								options={OPTIONS.orientation}
								className="text-lg"
							/>
						</div>

						<div className="w-full">
							<div className="flex items-center">
								<p className="font-secondary text-lg font-bold">Location</p>
								<button
									type="button"
									className="ml-1 disabled:opacity-50"
									title="Update location"
									disabled={loadingLocation}
									onClick={handleUpdateLocation}
								>
									<RiRefreshLine
										size="20px"
										className={`${loadingLocation ? "animate-spin" : ""}`}
									/>
								</button>
							</div>

							<p className="py-1 text-lg">{location?.address}</p>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
