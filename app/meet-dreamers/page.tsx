import MeetDreamersLayout from "@/components/meet-dreamers-layout/MeetDreamersLayout";
import { ROUTES } from "@/routes/routes";
import { verifyIdToken } from "@/utils/auth";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: "Meet Dreamers",
};

export default async function MeetDreamersPage() {
	const user = await verifyIdToken();

	if (!user) {
		redirect(ROUTES.HOME);
	}

	return <MeetDreamersLayout />;
}
