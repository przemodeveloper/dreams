"use client";

import { useUserStore } from "@/hooks/useUserStore";

export default function YourDreamersLayout({ slug }: { slug: string }) {
	const { matchedProfiles } = useUserStore((state) => state);

	console.log(matchedProfiles);

	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<h1 className="text-2xl font-bold">YourDreamersLayout {slug}</h1>
		</div>
	);
}
