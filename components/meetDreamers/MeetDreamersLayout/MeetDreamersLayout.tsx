"use client";

import { useMatchProfiles } from "@/hooks/useMatchProfiles";
import { useUserStore } from "@/hooks/useUserStore";
import { useMemo } from "react";
import SwipeCards from "@/components/swipeCards/SwipeCards";
import AvatarImage from "@/public/default-avatar.png";

export default function MeetDreamersLayout() {
	const { profile } = useUserStore((state) => state);

	const { matchProfiles } = useMatchProfiles(profile?.userId);

	const profiles = useMemo(() => {
		return matchProfiles?.map((profile) => ({
			id: profile.userId,
			username: profile.username,
			image: profile.images.find((image) => image.downloadUrl) ?? {
				downloadUrl: AvatarImage.src,
				filePath: "",
				imageRefId: "",
			},
			age: profile.age,
			bio: profile.bio || "",
		}));
	}, [matchProfiles]);

	return (
		<div className="container mx-auto">
			{profiles && <SwipeCards profiles={profiles} />}
		</div>
	);
}
