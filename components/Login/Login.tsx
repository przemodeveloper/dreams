"use client";

import useAuthUser from "@/hooks/useAuthUser";
import { RiGoogleFill } from "@remixicon/react";
import FormField from "../FormField/FormField";

export default function Login() {
	const { signIn } = useAuthUser();

	const handleSignIn = async (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();

		await signIn();
	};

	return (
		<div className="flex flex-col items-center w-1/4">
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
