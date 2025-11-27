"use client";

import { LOADING_STATE } from "@/constants/user-profile";
import { useUserStore } from "@/hooks/useUserStore";
import { useMemo } from "react";
import AppLoader from "../app-loader/AppLoader";
import MatchDetails from "../match-details/MatchDetails";

export default function YourDreamersLayout({ slug }: { slug: string }) {
	const { matchedProfiles, matchedProfilesLoading } = useUserStore(
		(state) => state
	);

	const match = useMemo(
		() => matchedProfiles?.find((profile) => profile.id === slug),
		[matchedProfiles, slug]
	);

	if (matchedProfilesLoading === LOADING_STATE.PENDING) {
		return <AppLoader />;
	}

	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<MatchDetails details={match} />
		</div>
	);
}
