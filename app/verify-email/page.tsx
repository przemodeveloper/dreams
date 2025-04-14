import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Verify your email",
};

export default function VerifyEmailPage() {
	return (
		<div className="flex flex-col items-center justify-center h-[calc(100vh-60px)]">
			<h1 className="text-emerald-600 font-primary mb-2">Dreams</h1>
			<p className="text-indigo-600">
				Please check your email for a verification link.
			</p>
		</div>
	);
}
