"use client";

import useAuthUser from "@/hooks/useAuthUser";
import "./globals.css";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import { NotificationContextProvider } from "@/context/notification-context";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { user, loading } = useAuthUser();

	return (
		<html lang="en">
			<body>
				<NotificationContextProvider>
					{loading === "pending" && !user ? <LoadingScreen /> : children}
				</NotificationContextProvider>
			</body>
		</html>
	);
}
