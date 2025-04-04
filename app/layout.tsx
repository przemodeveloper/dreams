import "./globals.css";

import { Metadata } from "next";
import UserProvider from "@/components/UserProvider/UserProvider";

export const metadata: Metadata = {
	title: "Dreams",
	description:
		"Unique dating app designed to connect people who share similar aspirations and plans for the future",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<UserProvider>{children}</UserProvider>
			</body>
		</html>
	);
}
