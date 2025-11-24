"use client";

import LoadingScreen from "@/components/layout/LoadingScreen/LoadingScreen";
import { NotificationContextProvider } from "@/context/notification-context";
import Navbar from "../components/layout/Navbar/Navbar";
import { LOADING_STATE } from "@/constants/user-profile";
import { useUserStore } from "@/hooks/useUserStore";
import { useEffect } from "react";

export default function UserProvider({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { init, loading, authUser } = useUserStore((state) => state);

	useEffect(() => {
		const unsub = init();
		return () => unsub?.();
	}, [init]);

	return (
		<NotificationContextProvider>
			<Navbar />
			{loading === LOADING_STATE.PENDING && !authUser ? (
				<LoadingScreen />
			) : (
				children
			)}
		</NotificationContextProvider>
	);
}
