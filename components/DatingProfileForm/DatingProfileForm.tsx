"use client";

import FormField from "../FormField/FormField";
import Select from "../Select/Select";
import { handleSetProfile } from "@/lib/actions";
import SubmitButton from "../SubmitButton/SubmitButton";
import { useActionState } from "react";
import type { InitialFormState } from "@/models/form";
import { joinErrorMessages } from "@/utils/joinErrorMessages";
import {
	dreamOptions,
	genderOptions,
	initialFormState,
	orientationOptions,
} from "./datingProfile.consts";
import useAuthUser from "@/hooks/useAuthUser";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/routes/routes";
import ImagePicker from "../ImagePicker/ImagePicker";
import { imageRefIds } from "@/constants/user-profile";
import UserLocation from "../UserLocation/UserLocation";
import { useUserLocation } from "@/hooks/useUserLocation";

export default function DatingProfileForm() {
	const { user } = useAuthUser();
	const router = useRouter();
	const { location, error, loading } = useUserLocation({ skipOnMount: false });

	const [state, formAction] = useActionState(
		async (prevState: InitialFormState, formData: FormData) => {
			const result = await handleSetProfile(
				prevState,
				formData,
				location,
				user?.uid
			);

			if (result.success) {
				router.push(ROUTES.USER_PROFILE);
			}
			return result;
		},
		initialFormState
	);

	const { formErrors } = state || initialFormState.formErrors;
	const { formValues } = state || initialFormState.formValues;

	return (
		<form className="w-full max-w-xl" action={formAction}>
			<div className="w-full px-3 gap-3 mb-4">
				<label
					className="font-secondary block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
					htmlFor="image"
				>
					Images
				</label>
				<div className="grid-cols-3 grid gap-3">
					{imageRefIds.map((imageRefId) => {
						return (
							<ImagePicker
								key={imageRefId}
								imageRefId={imageRefId}
								userId={user?.uid}
							/>
						);
					})}
				</div>
			</div>

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
				<Select
					keyValue={formValues.dream}
					name="dream"
					id="dream"
					label="Dream"
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
				<Select
					keyValue={formValues.gender}
					name="gender"
					id="gender"
					label="Gender"
					defaultValue={formValues.gender || ""}
					options={genderOptions}
					error={joinErrorMessages(formErrors.gender)}
				/>
			</div>

			<div className="w-full px-3 mb-4">
				<Select
					keyValue={formValues.orientation}
					name="orientation"
					id="orientation"
					label="Sexual Orientation"
					defaultValue={formValues.orientation || ""}
					options={orientationOptions}
					error={joinErrorMessages(formErrors.orientation)}
				/>
			</div>

			<div className="w-full px-3 mb-4">
				<p className="font-secondary block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
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

			<div className="w-full text-right px-3 mb-4">
				<SubmitButton />
			</div>
		</form>
	);
}
