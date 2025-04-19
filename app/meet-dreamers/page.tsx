import MeetDreamersLayout from "@/components/meetDreamers/MeetDreamersLayout/MeetDreamersLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Meet Dreamers",
};

export default function MeetDreamersPage() {
	return <MeetDreamersLayout />;
}
