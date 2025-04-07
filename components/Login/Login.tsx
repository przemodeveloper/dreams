"use client";

import { RiGoogleFill } from "@remixicon/react";
import FormField from "../FormField/FormField";
import { signInWithPopup } from "firebase/auth";
import { getSnapshot } from "@/utils/getSnapshot";
import { auth, provider } from "@/firebase";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/routes/routes";

export default function Login() {
	const router = useRouter();

	const handleSignIn = async () => {
		try {
			const result = await signInWithPopup(auth, provider);
			const authUser = result.user;

			const snapshot = await getSnapshot(authUser.uid);

			if (snapshot.empty) {
				router.push(ROUTES.SET_UP_PROFILE);
			} else {
				router.push(ROUTES.USER_PROFILE);
			}
		} catch (error) {
			const err = error as Error;
			throw new Error(err.message);
		}
	};

	return (
		<div className="flex flex-col items-center w-full px-5 sm:px-0 sm:w-1/2 md:w-1/3 lg:w-1/4">
			<button
				type="button"
				className="text-lg flex items-center"
				title="Sign in with Google"
				onClick={handleSignIn}
			>
				<RiGoogleFill className="inline-block mr-2" size={20} />{" "}
				<span>Sign in with Google</span>
			</button>
			<div className="flex items-center w-full my-4">
				<hr className="w-full border-gray-300" />
				<span className="mx-2">Or</span>
				<hr className="w-full border-gray-300" />
			</div>
			<FormField
				name="email"
				id="email"
				Component="input"
				type="email"
				placeholder="Email"
			/>
			<FormField
				name="password"
				id="password"
				Component="input"
				type="password"
				placeholder="Password"
			/>
			<button
				type="submit"
				title="Sign in with email"
				className="transition ease-in-out duration-300 border-2 bg-black hover:bg-white hover:border-2 hover:border-black hover:text-black text-white font-bold py-2 px-4 rounded disabled:opacity-50"
			>
				Sign in with email
			</button>
		</div>
	);
}
