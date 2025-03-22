"use client";

import {
	dreamOptions,
	genderOptions,
	orientationOptions,
} from "@/components/DatingProfileForm/datingProfile.consts";
import FormField from "@/components/FormField/FormField";
import ImagePreview from "@/components/ImagePreview/ImagePreview";
import ImageSkeleton from "@/components/ImageSkeleton/ImageSkeleton";
import Select from "@/components/Select/Select";
import UserProfileSkeleton from "@/components/UserProfileSkeleton/UserProfileSkeleton";
import { imageRefIds } from "@/constants/user-profile";
import useAuthUser from "@/hooks/useAuthUser";
import { useGetImages } from "@/hooks/useGetImages";
import { Option } from "@/models/form";
import { getLabel } from "@/utils/getLabel";
import {
	RiCloseCircleFill,
	RiEditCircleLine,
	RiSave2Fill,
} from "@remixicon/react";
import { useState } from "react";

type Field = "bio" | "dream" | "gender" | "orientation";

export default function UserProfilePage() {
	const { user, loading: loadingUser } = useAuthUser();

	const [editState, setEditState] = useState({
		bio: false,
		dream: false,
		gender: false,
		orientation: false,
	});

	const {
		images,
		downloadingImages,
		uploadingImage,
		handleDeleteImage,
		handleUploadImage,
	} = useGetImages(imageRefIds, user?.uid);

	const location = user?.location;

	const renderEditableField = ({
		label,
		field,
		type,
		options,
	}: {
		label: string;
		field: Field;
		type: "textarea" | "input" | "select";
		options?: Option[];
	}) => {
		return (
			<div className="border-b-2 w-full">
				<div className="flex items-center">
					<label
						htmlFor={`field-${field}`}
						className="font-secondary text-lg font-bold"
					>
						{label}
					</label>
					<div className="flex items-center">
						<button
							type="button"
							className="ml-1"
							onClick={() =>
								setEditState((prevState) => ({ ...prevState, [field]: true }))
							}
						>
							<RiEditCircleLine size="20px" />
						</button>
					</div>
				</div>

				{editState[field] ? (
					<>
						{type === "textarea" && (
							<FormField
								name="bio"
								id={`field-${field}`}
								type="textarea"
								defaultValue={user?.bio || ""}
								Component="textarea"
								rows={4}
							/>
						)}
						{type === "select" && options && (
							<Select
								keyValue={user?.[field]}
								name={field}
								id={`field-${field}`}
								defaultValue={user?.[field] || ""}
								options={options}
							/>
						)}
						<div className="flex gap-2 mb-2 justify-end">
							<button type="button">
								<RiSave2Fill />
							</button>
							<button
								type="button"
								onClick={() =>
									setEditState((prevState) => ({
										...prevState,
										[field]: false,
									}))
								}
							>
								<RiCloseCircleFill />
							</button>
						</div>
					</>
				) : (
					<p className="font-secondary mb-2">
						{type === "select" && options ? (
							<div className="bg-gray-200 rounded-full w-fit px-2 py-1 text-md">
								{getLabel(options, user?.[field])}
							</div>
						) : (
							<p className="text-lg">{user?.[field]}</p>
						)}
					</p>
				)}
			</div>
		);
	};

	return (
		<div className="h-screen">
			<form className="flex justify-center items-center flex-col w-full h-full">
				<div className="relative grid-cols-3 w-full md:w-2/3 lg:w-1/2 grid gap-3 mb-4">
					{downloadingImages === "pending" && images.length === 0 ? (
						<ImageSkeleton count={3} />
					) : (
						<>
							{images?.map((image) => (
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
						</>
					)}
				</div>
				<div className="flex items-center flex-col w-2/3 md:w-1/3 mx-auto">
					{loadingUser === "pending" && !user ? (
						<UserProfileSkeleton />
					) : (
						<>
							<h3 className="font-secondary border-b-2 mb-3 w-full">
								{user?.username}, {user?.age}
							</h3>

							<div className="mb-3 w-full">
								{renderEditableField({
									label: "Bio",
									field: "bio",
									type: "textarea",
								})}
							</div>

							<div className="mb-3 w-full">
								{renderEditableField({
									label: "Dream",
									field: "dream",
									type: "select",
									options: dreamOptions,
								})}
							</div>

							<div className="mb-3 w-full">
								{renderEditableField({
									label: "Gender",
									field: "gender",
									type: "select",
									options: genderOptions,
								})}
							</div>

							<div className="mb-3 w-full">
								{renderEditableField({
									label: "Orientation",
									field: "orientation",
									type: "select",
									options: orientationOptions,
								})}
							</div>

							<div className="w-full">
								<div className="flex items-center">
									<p className="font-secondary text-lg font-bold">Location</p>
									<button type="button" className="ml-1">
										<RiEditCircleLine size="20px" />
									</button>
								</div>

								<ul className="font-secondary flex space-x-2">
									<li className="bg-gray-200 rounded-full w-fit px-2 py-1">
										{location}
									</li>
								</ul>
							</div>
						</>
					)}
				</div>
			</form>
		</div>
	);
}
