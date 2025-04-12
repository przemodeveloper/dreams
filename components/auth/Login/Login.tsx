"use client";

import { RiGoogleFill } from "@remixicon/react";
import { signInWithPopup } from "firebase/auth";
import { getSnapshot } from "@/utils/getSnapshot";
import { auth, provider } from "@/firebase";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/routes/routes";
import FormField from "../../form/FormField/FormField";
import SubmitButton from "@/components/form/SubmitButton/SubmitButton";
import { useActionState } from "react";
import type { InitialLoginFormState } from "@/models/form";
import { handleLogin } from "@/lib/actions";
import { initialLoginFormState } from "@/constants/form";
import { joinErrorMessages } from "@/utils/joinErrorMessages";
import { useNotificationContext } from "@/context/notification-context";

export default function Login() {
	const router = useRouter();
	const { notify } = useNotificationContext();

	const handleSignInWithPopup = async () => {
		try {
			const result = await signInWithPopup(auth, provider);
			const authUser = result.user;

			const authToken = await authUser?.getIdToken();

			await fetch("/api/set-token", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ authToken }),
			});

			const snapshot = await getSnapshot(authUser.uid);

			if (snapshot.empty) {
				router.push(ROUTES.SET_UP_PROFILE);
			} else {
				router.push(ROUTES.USER_PROFILE);
			}
		} catch (error) {
			const err = error as Error;
			notify(err.message);
		}
	};

	const [state, formAction] = useActionState<InitialLoginFormState, FormData>(
		async (
			state: InitialLoginFormState,
			formData: FormData
		): Promise<InitialLoginFormState> => {
			try {
				const result = await handleLogin(state, formData);

				await fetch("/api/set-token", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ authToken: result.authToken }),
				});

				if (result.userId) {
					const snapshot = await getSnapshot(result.userId);

					if (result.emailVerified) {
						if (snapshot.empty) {
							router.push(ROUTES.SET_UP_PROFILE);
						} else {
							router.push(ROUTES.USER_PROFILE);
						}
					} else {
						notify("Please verify your email first.");
					}
				}

				return result;
			} catch (error) {
				const err = error as Error;
				notify(err.message);
				return state;
			}
		},
		initialLoginFormState
	);

	const { formErrors } = state || initialLoginFormState.formErrors;
	const { formValues } = state || initialLoginFormState.formValues;

	return (
		<div className="flex flex-col items-center w-full px-5 sm:px-0 sm:w-1/2 md:w-1/3 lg:w-1/4">
			<button
				type="button"
				className="text-lg flex items-center text-indigo-600"
				title="Sign in with Google"
				onClick={handleSignInWithPopup}
			>
				<RiGoogleFill className="inline-block mr-2" size={20} />{" "}
				<span>Sign in with Google</span>
			</button>
			<div className="flex items-center w-full my-4">
				<hr className="w-full border-gray-300" />
				<span className="mx-2 text-slate-700">Or</span>
				<hr className="w-full border-gray-300" />
			</div>
			<form action={formAction}>
				<FormField
					name="email"
					id="email"
					Component="input"
					type="email"
					placeholder="Email"
					defaultValue={formValues.email}
					className="mb-2"
					error={joinErrorMessages(formErrors.email)}
				/>
				<FormField
					name="password"
					id="password"
					Component="input"
					type="password"
					placeholder="Password"
					defaultValue={formValues.password}
					className="mb-2"
					error={joinErrorMessages(formErrors.password)}
				/>
				<div className="w-full text-center mb-4">
					<SubmitButton title="Sign in" text="Sign in with email" />
				</div>
			</form>
		</div>
	);
}
