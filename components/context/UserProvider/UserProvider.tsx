"use client";

import useAuthUser from "@/hooks/useAuthUser";
import LoadingScreen from "@/components/layout/LoadingScreen/LoadingScreen";
import { NotificationContextProvider } from "@/context/notification-context";
import { UserContextProvider } from "@/context/user-context";
import Navbar from "../../layout/Navbar/Navbar";
import { LOADING_STATE } from "@/constants/user-profile";

export default function UserProvider({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { user, loading } = useAuthUser();

	return (
		<UserContextProvider userId={user?.uid}>
			<NotificationContextProvider>
				<Navbar />
				{loading === LOADING_STATE.PENDING && !user ? (
					<LoadingScreen />
				) : (
					children
				)}
			</NotificationContextProvider>
		</UserContextProvider>
	);
}
