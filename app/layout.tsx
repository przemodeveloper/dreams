import "./globals.css";
import { Roboto } from "next/font/google";
import UserProvider from "@/components/auth/UserProvider/UserProvider";
import Footer from "@/components/layout/Footer/Footer";

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
				<div className="pb-[64px]">
					<UserProvider>{children}</UserProvider>
				</div>
				<Footer />
			</body>
		</html>
	);
}
