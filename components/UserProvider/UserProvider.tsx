"use client";

import useAuthUser from "@/hooks/useAuthUser";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import { NotificationContextProvider } from "@/context/notification-context";
import { UserContextProvider } from "@/context/user-context";
import { useMemo } from "react";
export default function UserProvider({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { user, loading } = useAuthUser();
	const value = useMemo(() => ({ user, loading }), [user, loading]);

	return (
		<UserContextProvider value={value}>
			<NotificationContextProvider>
				{loading === "pending" && !user ? <LoadingScreen /> : children}
			</NotificationContextProvider>
		</UserContextProvider>
	);
}
