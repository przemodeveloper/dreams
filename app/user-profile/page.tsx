import UpdateProfileForm from "@/components/UpdateProfileForm/UpdateProfileForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Your Dreams Profile",
};

export default function UserProfilePage() {
	return <UpdateProfileForm />;
}
