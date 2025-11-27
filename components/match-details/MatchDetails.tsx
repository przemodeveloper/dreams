"use client";

import type { Profile } from "@/models/profiles";
import Image from "next/image";
import { DREAM_OPTIONS } from "@/constants/form";
import { ORIENTATION_OPTIONS } from "@/constants/form";
import { GENDER_OPTIONS } from "@/constants/form";

export default function MatchDetails({ details }: { details: Profile }) {
	const { username, bio, dream, orientation, gender, image, interests } =
		details || {};

	return (
		<div className="flex flex-col items-center justify-center h-screen w-full md:w-1/2 shadow h-1/2 p-12">
			<div className="rounded-full overflow-hidden w-40 h-40 mb-4">
				<Image
					className="object-cover w-full h-full"
					src={image?.downloadUrl}
					alt={username}
					width={100}
					height={100}
				/>
			</div>

			<h1 className="text-2xl font-bold mb-2">{username}</h1>
			<p className="text-sm text-gray-500 mb-2 text-center">{bio}</p>
			<p className="text-sm font-bold text-emerald-600 mb-2">
				Dream: {DREAM_OPTIONS[dream]}
			</p>
			<p className="text-sm text-gray-500 mb-2">
				{ORIENTATION_OPTIONS[orientation]}
			</p>
			<p className="text-sm text-gray-500 mb-2">{GENDER_OPTIONS[gender]}</p>
			<p className="text-sm text-gray-500 mb-2">
				{interests?.split(",").join(", ")}
			</p>
		</div>
	);
}
