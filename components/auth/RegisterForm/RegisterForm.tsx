"use client";

import FormField from "@/components/form/FormField/FormField";
import { handleRegister } from "@/lib/actions";
import { ROUTES } from "@/routes/routes";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { joinErrorMessages } from "@/utils/joinErrorMessages";
import type { InitialRegisterFormState } from "@/models/form";
import { initialRegisterFormState } from "@/constants/form";
import SubmitButton from "@/components/form/SubmitButton/SubmitButton";

export default function RegisterForm() {
	const router = useRouter();

	const [state, formAction] = useActionState<
		InitialRegisterFormState,
		FormData
	>(async (state: InitialRegisterFormState, formData: FormData) => {
		const result = await handleRegister(state, formData);

		if (result.success) {
			router.push(ROUTES.SET_UP_PROFILE);
		}
		return result;
	}, initialRegisterFormState);

	const { formErrors } = state || initialRegisterFormState.formErrors;
	const { formValues } = state || initialRegisterFormState.formValues;

	return (
		<form
			className="mx-auto w-full md:w-2/3 lg:w-1/3 h-[calc(100vh-60px)] flex flex-col justify-center"
			action={formAction}
		>
			<div className="mb-4">
				<FormField
					id="email"
					Component="input"
					label="Email"
					name="email"
					type="email"
					defaultValue={formValues.email}
					placeholder="Enter your email"
					error={joinErrorMessages(formErrors.email)}
				/>
			</div>

			<div className="mb-4">
				<FormField
					id="password"
					Component="input"
					label="Password"
					name="password"
					type="password"
					defaultValue={formValues.password}
					placeholder="Enter your password"
					error={joinErrorMessages(formErrors.password)}
				/>
			</div>
			<div className="mb-4">
				<FormField
					id="confirmPassword"
					Component="input"
					label="Confirm Password"
					name="confirmPassword"
					type="password"
					defaultValue={formValues.confirmPassword}
					placeholder="Confirm your password"
					error={joinErrorMessages(formErrors.confirmPassword)}
				/>
			</div>
			<div className="w-full text-center px-3 mb-4">
				<SubmitButton title="Register" text="Register" />
			</div>
		</form>
	);
}
