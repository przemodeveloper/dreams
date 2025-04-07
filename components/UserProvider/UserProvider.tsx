"use client";

import useAuthUser from "@/hooks/useAuthUser";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import { NotificationContextProvider } from "@/context/notification-context";
import { UserContextProvider } from "@/context/user-context";
import Navbar from "../Navbar/Navbar";

export default function UserProvider({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { user, loading } = useAuthUser();

	return (
		<UserContextProvider userId={user?.uid} isLoggedIn={Boolean(user)}>
			<NotificationContextProvider>
				<Navbar />
				{loading === "pending" && !user ? <LoadingScreen /> : children}
			</NotificationContextProvider>
		</UserContextProvider>
	);
}
