import DatingProfileForm from "@/components/profile/DatingProfileForm/DatingProfileForm";
import { ROUTES } from "@/routes/routes";
import { verifyIdToken } from "@/utils/auth";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: "Set up your Dreams profile",
};

export default async function SetUpProfilePage() {
	const user = await verifyIdToken();

	if (!user) {
		redirect(ROUTES.HOME);
	}

	return (
		<div className="flex justify-center items-center flex-col">
			<h1 className="font-primary mb-6 text-center text-emerald-600">
				Set up your dating profile!
			</h1>
			<DatingProfileForm />
		</div>
	);
}
