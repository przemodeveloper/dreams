import UpdateProfileLayout from "@/components/UpdateProfileLayout/UpdateProfileLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Your Dreams Profile",
};

export default function UserProfilePage() {
	return <UpdateProfileLayout />;
}
