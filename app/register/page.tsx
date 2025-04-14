import RegisterForm from "@/components/auth/RegisterForm/RegisterForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Register",
};

export default function RegisterPage() {
	return (
		<div className="flex justify-center flex-col items-center h-[calc(100vh-60px)]">
			<h1 className="font-primary mb-4 text-emerald-600">Dreams</h1>
			<RegisterForm />
		</div>
	);
}
