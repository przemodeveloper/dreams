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
import useAuthUser from "@/hooks/useAuthUser";
import { useManageUser } from "@/hooks/useManageUser";
import { useUserLocation } from "@/hooks/useUserLocation";
import type { Field, Option } from "@/models/form";
import { getLabel } from "@/utils/getLabel";
import {
	RiCloseCircleFill,
	RiEditCircleLine,
	RiRefreshLine,
	RiSave2Fill,
} from "@remixicon/react";
import { useEffect, useState } from "react";

const OPTIONS = {
	gender: genderOptions.filter((option) => Boolean(option.value)),
	orientation: orientationOptions.filter((option) => Boolean(option.value)),
	dream: dreamOptions.filter((option) => Boolean(option.value)),
};

export default function UserProfilePage() {
	const { user } = useAuthUser();

	const {
		uploadingImage,
		handleDeleteImage,
		handleUploadImage,
		handleUpdateUserProfile,
		userData,
		loading,
	} = useManageUser(user?.uid);

	const {
		location: updatedLocation,
		loading: loadingLocation,
		getUserLocation,
	} = useUserLocation({ skipOnMount: true });

	const [values, setValues] = useState({
		bio: {
			value: "",
		},
		dream: {
			value: "",
			label: "",
		},
		age: {
			value: "",
		},
		gender: {
			value: "",
			label: "",
		},
		orientation: {
			value: "",
			label: "",
		},
	});

	const [editState, setEditState] = useState({
		bio: false,
		dream: false,
		gender: false,
		orientation: false,
		age: false,
	});

	const location = userData?.location;

	const handleUpdateLocation = async () => {
		await getUserLocation();
		if (updatedLocation) {
			await handleUpdateUserProfile("location", updatedLocation);
		}
	};

	useEffect(() => {
		if (userData) {
			setValues((prevState) => {
				const updatedValues = { ...prevState };

				for (const key in prevState) {
					updatedValues[key as keyof typeof prevState] = {
						value: String(userData[key as keyof typeof prevState]) || "",
						...(OPTIONS[key as keyof typeof OPTIONS] && {
							label: getLabel(
								OPTIONS[key as keyof typeof OPTIONS],
								userData[key as keyof typeof OPTIONS]
							),
						}),
					};
				}

				return updatedValues;
			});
		}
	}, [userData]);

	const renderEditableField = ({
		label,
		field,
		component,
		type,
		options,
	}: {
		label: string;
		field: Field;
		component: "textarea" | "input" | "select";
		type?: "text" | "number";
		options?: Option[];
	}) => {
		const handleChange = (
			e: React.ChangeEvent<
				HTMLTextAreaElement | HTMLSelectElement | HTMLInputElement
			>,
			fieldType?: "textarea" | "select" | "input",
			options?: Option[]
		) => {
			setValues((prevState) => ({
				...prevState,
				[field]: {
					...prevState[field],
					value: e.target.value,
					...(fieldType === "select" &&
						options && {
							label: getLabel(options, e.target.value),
						}),
				},
			}));
		};

		const handleDiscard = () => {
			setEditState((prevState) => ({
				...prevState,
				[field]: false,
			}));
			setValues((prevState) => ({
				...prevState,
				[field]: {
					value: userData?.[field],
					label: getLabel(options || [], String(userData?.[field])),
				},
			}));
		};

		const handleSave = async () => {
			await handleUpdateUserProfile(field, values[field].value);
			setEditState((prevState) => ({
				...prevState,
				[field]: false,
			}));
		};

		return (
			<div className="border-b-2 w-full">
				<div className="flex items-center">
					<label
						htmlFor={`field-${field}`}
						className="font-secondary text-lg font-bold"
					>
						{label}
					</label>
					{!editState[field] && (
						<div className="flex items-center">
							<button
								type="button"
								className="ml-1"
								title={`Edit ${label}`}
								onClick={() =>
									setEditState((prevState) => ({ ...prevState, [field]: true }))
								}
							>
								<RiEditCircleLine size="20px" />
							</button>
						</div>
					)}
				</div>

				{editState[field] ? (
					<>
						{(component === "textarea" || component === "input") && (
							<FormField
								name={field}
								id={`field-${field}`}
								type={type || "text"}
								value={values[field].value}
								onChange={(e) => handleChange(e, component)}
								Component={component}
								{...(component === "textarea" ? { rows: 4 } : {})}
							/>
						)}
						{component === "select" && options && (
							<Select
								keyValue={values[field].value}
								name={field}
								id={`field-${field}`}
								value={values[field].value}
								options={options}
								onChange={(e) => handleChange(e, "select", options)}
							/>
						)}
						<div className="flex gap-2 mb-2 justify-end">
							<button
								type="button"
								onClick={handleSave}
								title={`Save ${label} changes`}
							>
								<RiSave2Fill />
							</button>
							<button
								type="button"
								onClick={handleDiscard}
								title={`Discard ${label} changes`}
							>
								<RiCloseCircleFill />
							</button>
						</div>
					</>
				) : (
					<>
						{component === "select" && options ? (
							<p className="font-secondary mb-2 bg-gray-200 rounded-full w-fit px-2 py-1 text-md">
								{getLabel(options, String(userData?.[field]))}
							</p>
						) : (
							<p className="font-secondary mb-2 text-lg">{userData?.[field]}</p>
						)}
					</>
				)}
			</div>
		);
	};

	return (
		<form className="flex justify-center items-center flex-col pt-4">
			<div className="relative w-full md:w-2/3 lg:w-1/2 grid grid-cols-3 gap-3 mb-4">
				{!userData && loading === "pending" ? (
					<ImageSkeleton count={3} />
				) : (
					<>
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
					</>
				)}
			</div>
			<div className="flex items-center flex-col w-2/3 lg:w-1/3 mx-auto">
				{!userData && loading === "pending" ? (
					<UserProfileSkeleton />
				) : (
					<>
						<h3 className="font-secondary border-b-2 mb-3 w-full">
							{userData?.username}
						</h3>

						<div className="mb-3 w-full">
							{renderEditableField({
								label: "Bio",
								field: "bio",
								type: "text",
								component: "textarea",
							})}
						</div>

						<div className="mb-3 w-full">
							{renderEditableField({
								label: "Age",
								field: "age",
								type: "number",
								component: "input",
							})}
						</div>

						<div className="mb-3 w-full">
							{renderEditableField({
								label: "Dream",
								field: "dream",
								component: "select",
								options: OPTIONS.dream,
							})}
						</div>

						<div className="mb-3 w-full">
							{renderEditableField({
								label: "Gender",
								field: "gender",
								component: "select",
								options: OPTIONS.gender,
							})}
						</div>

						<div className="mb-3 w-full">
							{renderEditableField({
								label: "Orientation",
								field: "orientation",
								component: "select",
								options: OPTIONS.orientation,
							})}
						</div>

						<div className="w-full">
							<div className="flex items-center">
								<p className="font-secondary text-lg font-bold">Location</p>
								<button
									type="button"
									className="ml-1"
									title="Update location"
									onClick={handleUpdateLocation}
								>
									<RiRefreshLine
										size="20px"
										className={`${loadingLocation ? "animate-spin" : ""}`}
									/>
								</button>
							</div>

							<p className="w-fit py-1">{location?.address}</p>
						</div>
					</>
				)}
			</div>
		</form>
	);
}
