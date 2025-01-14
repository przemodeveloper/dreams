"use client";

import useAuthUser from "@/hooks/useAuthUser";
import "./globals.css";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { user, loading } = useAuthUser();

	return (
		<html lang="en">
			<body>
				{loading === "pending" && !user ? <LoadingScreen /> : children}
			</body>
		</html>
	);
}
