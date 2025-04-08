import Login from "@/components/auth/Login/Login";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Login to Dreams",
};

export default function LoginPage() {
	return (
		<div className="flex justify-center flex-col items-center h-[calc(100vh-60px)]">
			<h1 className="font-primary mb-2 text-emerald-600">Dreams</h1>
			<Login />
		</div>
	);
}
