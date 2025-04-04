import UpdateProfileForm from "@/components/UpdateProfileForm/UpdateProfileForm";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Update Dreams Profile",
};

export default function UserProfilePage() {
	return <UpdateProfileForm />;
}
