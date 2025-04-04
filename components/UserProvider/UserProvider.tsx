"use client";

import useAuthUser from "@/hooks/useAuthUser";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import { NotificationContextProvider } from "@/context/notification-context";

export default function UserProvider({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { user, loading } = useAuthUser();

	return (
		<NotificationContextProvider>
			{loading === "pending" && !user ? <LoadingScreen /> : children}
		</NotificationContextProvider>
	);
}
