"use client";

import { useUserStore } from "@/hooks/useUserStore";
import { RiArrowRightLine } from "@remixicon/react";
import clsx from "clsx";
import { useEffect, useState } from "react";
import Image from "next/image";
import { LOADING_STATE } from "@/constants/user-profile";
import AppLoader from "../appLoader/AppLoader";

const MatchesDrawer = () => {
	const [isOpen, setIsOpen] = useState(true);

	const {
		profile,
		getMatchedProfiles,
		matchedProfiles,
		matchedProfilesLoading,
	} = useUserStore();

	const handleClose = () => setIsOpen((prev) => !prev);

	useEffect(() => {
		if (!profile?.userId) return;
		getMatchedProfiles(profile.userId);
	}, [profile?.userId, getMatchedProfiles]);

	return (
		<aside
			className={clsx(
				"fixed top-[60px] left-0 h-screen w-[300px] bg-white p-2 shadow-lg border-r border-emerald-600 z-40",
				"transition-transform duration-300",
				isOpen ? "translate-x-0" : "-translate-x-[calc(100%-40px)]"
			)}
		>
			<ul className="space-y-1">
				{matchedProfilesLoading === LOADING_STATE.PENDING && (
					<li className="h-screen flex items-center justify-center">
						<AppLoader />
					</li>
				)}
				{matchedProfiles?.map((item) => (
					<li key={item.username} className="text-sm flex items-center gap-2">
						<div className="rounded-full overflow-hidden w-8 h-8">
							<Image
								src={item.image.downloadUrl}
								alt={item.username}
								width={30}
								height={30}
								className="object-cover w-full h-full"
							/>
						</div>

						<span className="text-sm font-medium text-neutral-500">
							{item.username}
						</span>
					</li>
				))}
			</ul>
			<button
				type="button"
				onClick={handleClose}
				aria-expanded={isOpen}
				title={isOpen ? "Close matches drawer" : "Open matches drawer"}
				className={clsx(
					"absolute top-1 right-1 z-50 bg-white p-1 hover:bg-gray-50",
					"transition-transform duration-300"
				)}
			>
				<RiArrowRightLine
					className={clsx(
						"transition-transform duration-300 text-emerald-600",
						isOpen ? "rotate-180" : "rotate-0"
					)}
				/>
			</button>
		</aside>
	);
};

export default MatchesDrawer;
