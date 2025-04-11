import UpdateProfileLayout from "@/components/profile/UpdateProfileLayout/UpdateProfileLayout";
import { ROUTES } from "@/routes/routes";
import { verifyIdToken } from "@/utils/auth";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: "Your Dreams Profile",
};

export default async function UserProfilePage() {
	const user = await verifyIdToken();

	if (!user) {
		redirect(ROUTES.HOME);
	}

	return <UpdateProfileLayout />;
}
