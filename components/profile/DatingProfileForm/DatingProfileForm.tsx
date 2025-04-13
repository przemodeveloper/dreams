"use client";

import FormField from "../../form/FormField/FormField";
import { handleSetProfile } from "@/lib/actions";
import SubmitButton from "../../form/SubmitButton/SubmitButton";
import { useActionState, useState } from "react";
import type { InitialSetupProfileFormState } from "@/models/form";
import { joinErrorMessages } from "@/utils/joinErrorMessages";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/routes/routes";
import { imageRefIds } from "@/constants/user-profile";
import { useUserLocation } from "@/hooks/useUserLocation";
import UserLocation from "../UserLocation/UserLocation";
import ImagePicker from "@/components/image/ImagePicker/ImagePicker";
import InterestsList from "@/components/interests/InterestsList/InterestsList";
import {
	dreamOptions,
	genderOptions,
	initialSetupProfileFormState,
	orientationOptions,
} from "@/constants/form";
import { useNotificationContext } from "@/context/notification-context";
import { useUserStore } from "@/hooks/useUserStore";

export default function DatingProfileForm() {
	const { authUser } = useUserStore((state) => state);
	const router = useRouter();
	const { location, error, loading } = useUserLocation({ skipOnMount: false });
	const { notify } = useNotificationContext();
	const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

	const handleSelectInterest = (interest: string) => {
		setSelectedInterests((prevState) =>
			prevState.includes(interest)
				? prevState.filter((i) => i !== interest)
				: [...prevState, interest]
		);
	};

	const [state, formAction] = useActionState(
		async (
			prevState: InitialSetupProfileFormState,
			formData: FormData
		): Promise<InitialSetupProfileFormState> => {
			formData.append("interests", selectedInterests.join(","));
			try {
				const result = await handleSetProfile(
					prevState,
					formData,
					location,
					authUser?.uid
				);

				if (result.success) {
					router.push(ROUTES.USER_PROFILE);
				}
				return result;
			} catch (error) {
				const err = error as Error;
				notify(err.message);
				return prevState;
			}
		},
		initialSetupProfileFormState
	);

	const { formErrors } = state || initialSetupProfileFormState.formErrors;
	const { formValues } = state || initialSetupProfileFormState.formValues;

	return (
		<form className="w-full" action={formAction}>
			<div className="mx-auto w-full md:w-2/3 lg:w-1/2 grid grid-cols-3 gap-3 mb-4">
				{imageRefIds.map((imageRefId) => {
					return (
						<ImagePicker
							key={imageRefId}
							imageRefId={imageRefId}
							userId={authUser?.uid}
						/>
					);
				})}
			</div>

			<div className="flex items-center flex-col w-full px-3 md:px-0 md:w-2/3 lg:w-1/3 mx-auto">
				<div className="w-full px-3 mb-4">
					<FormField
						name="username"
						id="username"
						type="text"
						defaultValue={formValues.username || ""}
						label="Username"
						Component="input"
						error={joinErrorMessages(formErrors.username)}
					/>
				</div>

				<div className="w-full px-3 mb-4">
					<FormField
						keyValue={formValues.dream}
						name="dream"
						id="dream"
						label="Dream"
						Component="select"
						defaultValue={formValues.dream || ""}
						options={dreamOptions}
						error={joinErrorMessages(formErrors.dream)}
					/>
				</div>

				<div className="w-full px-3 mb-4">
					<FormField
						name="bio"
						id="bio"
						type="textarea"
						defaultValue={formValues.bio || ""}
						label="Bio"
						Component="textarea"
						rows={4}
					/>
				</div>

				<div className="w-full px-3 mb-4">
					<FormField
						name="age"
						id="age"
						type="number"
						min={18}
						label="Age"
						defaultValue={String(formValues.age)}
						Component="input"
						error={joinErrorMessages(formErrors.age)}
					/>
				</div>

				<div className="w-full px-3 mb-4">
					<FormField
						keyValue={formValues.gender}
						name="gender"
						id="gender"
						Component="select"
						label="Gender"
						defaultValue={formValues.gender || ""}
						options={genderOptions}
						error={joinErrorMessages(formErrors.gender)}
					/>
				</div>

				<div className="w-full px-3 mb-4">
					<FormField
						keyValue={formValues.orientation}
						name="orientation"
						id="orientation"
						Component="select"
						label="Sexual Orientation"
						defaultValue={formValues.orientation || ""}
						options={orientationOptions}
						error={joinErrorMessages(formErrors.orientation)}
					/>
				</div>

				<div className="w-full px-3 mb-4 border-b-2 border-gray-200">
					<InterestsList
						selectedInterests={selectedInterests}
						onSelectInterest={handleSelectInterest}
					/>
					{formErrors.interests && (
						<p className="text-red-500 text-sm">{formErrors.interests}</p>
					)}
				</div>

				<div className="w-full px-3 mb-4 mt-2">
					<p className="block uppercase tracking-wide text-slate-700 text-sm font-bold mb-2">
						Location
					</p>
					{location && (
						<UserLocation
							address={location?.address}
							error={error}
							loading={loading}
						/>
					)}
				</div>

				<div className="w-full text-center mb-4">
					<SubmitButton title="Start your dream" text="Start your dream" />
				</div>
			</div>
		</form>
	);
}
