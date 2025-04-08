import DatingProfileForm from "@/components/profile/DatingProfileForm/DatingProfileForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Set up your Dreams profile",
};

export default function SetUpProfilePage() {
	return (
		<div className="flex justify-center items-center flex-col">
			<h1 className="font-primary mb-6 text-center">
				Set up your dating profile!
			</h1>
			<DatingProfileForm />
		</div>
	);
}
