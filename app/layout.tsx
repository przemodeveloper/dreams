import "./globals.css";
import { Roboto } from "next/font/google";
import { Metadata } from "next";
import UserProvider from "@/components/UserProvider/UserProvider";

export const metadata: Metadata = {
	title: "Dreams",
	description:
		"Unique dating app designed to connect people who share similar aspirations and plans for the future",
};

const roboto = Roboto({
	subsets: ["latin"],
	weight: ["100", "300", "400", "500", "700", "900"],
	display: "swap",
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={roboto.className}>
				<UserProvider>{children}</UserProvider>
			</body>
		</html>
	);
}
