"use client";

import Login from "@/components/Login/Login";
import useAuthUser from "@/hooks/useAuthUser";
import { ROUTES } from "@/routes/routes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
	const { user, loading } = useAuthUser();
	const router = useRouter();

	const { profileCreated, emailVerified } = user || {};

	useEffect(() => {
		if (loading === "pending") return;

		if (profileCreated) {
			router.push(ROUTES.USER_PROFILE);
		}

		if (!profileCreated && emailVerified) {
			router.push(ROUTES.SET_UP_PROFILE);
		}
	}, [profileCreated, emailVerified, router, loading]);

	return (
		<>
			{!user && loading === "resolved" && (
				<div className="flex justify-center flex-col items-center h-screen">
					<h1 className="font-primary mb-2">Dreams</h1>
					<Login />
				</div>
			)}
		</>
	);
}
