import "./globals.css";
import { Roboto } from "next/font/google";
import UserProvider from "@/components/context/UserProvider/UserProvider";

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
