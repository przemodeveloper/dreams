"use client";

import useAuthUser from "@/hooks/useAuthUser";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import { NotificationContextProvider } from "@/context/notification-context";
import { UserContextProvider } from "@/context/user-context";

export default function UserProvider({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { user, loading } = useAuthUser();

	return (
		<UserContextProvider value={{ user, loading }}>
			<NotificationContextProvider>
				{loading === "pending" && !user ? <LoadingScreen /> : children}
			</NotificationContextProvider>
		</UserContextProvider>
	);
}
