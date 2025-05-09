"use client";

import {
	generateAiPrompt,
	LOADING_STATE,
	type LoadingState,
	OPTIONS,
} from "@/constants/user-profile";
import { useNotificationContext } from "@/context/notification-context";
import { useUserLocation } from "@/hooks/useUserLocation";
import type { Field } from "@/models/form";
import { RiRefreshLine } from "@remixicon/react";
import { useEffect, useState } from "react";
import { getGeminiResponse } from "@/lib/api/gemini";
import { EditableField } from "@/components/form/EditableField/EditableField";
import InterestsList from "@/components/interests/InterestsList/InterestsList";
import ImagePreview from "@/components/image/ImagePreview/ImagePreview";
import type { UserProfile } from "@/lib/actions";
import { z } from "zod";

export default function UpdateProfileForm({
	userData,
	onUpdateUserProfile,
	uploadingImages,
	onDeleteImage,
	onUploadImage,
	userId,
}: {
	userData: UserProfile | null;
	onUpdateUserProfile: (field: Field, value: string | object) => Promise<void>;
	uploadingImages: Record<string, LoadingState>;
	onDeleteImage: (imageRefId: string) => Promise<void>;
	onUploadImage: (
		file: File,
		imageRefId: string,
		userId: string
	) => Promise<void>;
	userId: string;
}) {
	const { notify } = useNotificationContext();
	const [geminiResponse, setGeminiResponse] = useState<string>("");
	const [generatedBio, setGeneratedBio] = useState<string>("");
	const [loadingAiContent, setLoadingAiContent] = useState<LoadingState>(
		LOADING_STATE.IDLE
	);

	const { loading: loadingLocation, getUserLocation } = useUserLocation({
		skipOnMount: true,
	});

	const generateBioAi = async () => {
		try {
			setLoadingAiContent(LOADING_STATE.PENDING);
			const response = await getGeminiResponse(
				generateAiPrompt(
					userData?.username,
					userData?.dream,
					userData?.interests
				)
			);
			setGeminiResponse(response);
		} catch {
			notify("Error generating bio");
		}
	};

	const location = userData?.location;

	const handleSelectInterest = async (interest: string) => {
		const selectedInterests = userData?.interests?.split(",") || [];
		const newSelectedInterests = selectedInterests.includes(interest)
			? selectedInterests.filter((i) => i !== interest)
			: [...selectedInterests, interest];

		if (!newSelectedInterests.length) return;

		await onUpdateUserProfile("interests", newSelectedInterests.join(","));
		notify("Interests updated successfully!");
	};

	const handleUpdateLocation = async () => {
		const result = await getUserLocation();
		if (result?.location) {
			await onUpdateUserProfile("location", result?.location);
			notify("Location synced successfully!");
		} else if (result?.error) {
			notify(result.error);
		}
	};

	const handleSave = async (field: Field, value: string, label: string) => {
		await onUpdateUserProfile(field, value);
		notify(`${label} updated successfully!`);
	};

	useEffect(() => {
		if (geminiResponse) {
			let currentIndex = 0;
			const interval = setInterval(() => {
				if (currentIndex <= geminiResponse.length) {
					setGeneratedBio(geminiResponse.slice(0, currentIndex));
					currentIndex++;
				} else {
					setLoadingAiContent(LOADING_STATE.RESOLVED);
					clearInterval(interval);
				}
			}, 30);

			return () => clearInterval(interval);
		}
	}, [geminiResponse]);

	return (
		<>
			<div className="mx-auto w-full md:w-2/3 lg:w-1/2 grid grid-cols-3 gap-3 mb-4">
				{userData?.images?.map((image) => (
					<ImagePreview
						key={image.imageRefId}
						imageRefId={image.imageRefId}
						uploadingImages={uploadingImages}
						onDeleteImage={onDeleteImage}
						onUploadImage={async (file) =>
							await onUploadImage(file, image.imageRefId, userId)
						}
						filePath={image.filePath}
						imgSrc={image.downloadUrl}
						userId={userId}
						alt={image.imageRefId}
					/>
				))}
			</div>
			<div className="flex items-center flex-col w-full px-3 md:px-0 md:w-2/3 lg:w-1/3 mx-auto">
				<div className="mb-3 w-full">
					<EditableField
						field="username"
						label="Username"
						type="text"
						component="input"
						initialValue={userData?.username ?? ""}
						onSave={handleSave}
						className="text-3xl"
						showLabel={false}
						validationSchema={z
							.string({ required_error: "Username is required." })
							.min(3, "Username must be at least 3 characters.")}
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
						field="bio"
						label="Bio"
						type="text"
						component="textarea"
						initialValue={userData?.bio || ""}
						onSave={handleSave}
						aiGeneration={generateBioAi}
						aiText={generatedBio}
						loadingAiContent={loadingAiContent}
						rows={7}
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
						validationSchema={z
							.number({ required_error: "Age is required." })
							.min(18, "You must be at least 18 years old.")}
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
					/>
				</div>

				<div className="mb-3 w-full">
					<EditableField
						field="orientation"
						label="Sexual Orientation"
						component="select"
						initialValue={userData?.orientation || ""}
						onSave={handleSave}
						options={OPTIONS.orientation}
					/>
				</div>

				<div className="w-full border-b-2 border-gray-200">
					<InterestsList
						selectedInterests={userData?.interests?.split(",") || []}
						onSelectInterest={handleSelectInterest}
					/>
				</div>

				<div className="w-full mt-2">
					<div className="flex items-center">
						<p className="block uppercase tracking-wide text-slate-700 text-sm font-bold">
							Location
						</p>
						<button
							type="button"
							className="ml-1 disabled:opacity-50"
							title="Update location"
							disabled={loadingLocation}
							onClick={handleUpdateLocation}
						>
							<RiRefreshLine
								size="15px"
								className={`${loadingLocation ? "animate-spin" : ""}`}
							/>
						</button>
					</div>

					<p className="py-1 text-lg">{location?.address}</p>
				</div>
			</div>
		</>
	);
}
