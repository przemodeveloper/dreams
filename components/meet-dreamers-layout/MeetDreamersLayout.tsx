"use client";

import { useUserStore } from "@/hooks/useUserStore";
import { useEffect } from "react";
import SwipeCards from "@/components/swipe-cards/SwipeCards";
import { LOADING_STATE } from "@/constants/user-profile";
import AppLoader from "@/components/app-loader/AppLoader";

export default function MeetDreamersLayout() {
	const { profile, profiles, getProfiles, profilesLoading } = useUserStore(
		(state) => state
	);

	useEffect(() => {
		if (!profile?.userId) return;
		getProfiles(profile.userId);
	}, [profile?.userId, getProfiles]);

	return (
		<div className="container mx-auto">
			{profilesLoading === LOADING_STATE.PENDING && (
				<div className="flex h-screen items-center justify-center">
					<AppLoader />
				</div>
			)}

			{profilesLoading === LOADING_STATE.REJECTED && (
				<div className="flex h-screen items-center justify-center">
					<h1 className="text-2xl text-center font-secondary text-red-600">
						Something went wrong while loading dreamers.
						<br />
						Please try again later.
					</h1>
				</div>
			)}

			{profiles && profiles.length > 0 && <SwipeCards profiles={profiles} />}

			{profilesLoading === LOADING_STATE.RESOLVED &&
				profiles &&
				profiles.length === 0 && (
					<div className="flex h-screen items-center justify-center">
						<h1 className="text-2xl text-center font-secondary text-emerald-600">
							No dreamers? Don&apos;t worry, they are signing up every day!
						</h1>
					</div>
				)}
		</div>
	);
}
