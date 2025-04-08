import RegisterForm from "@/components/auth/RegisterForm/RegisterForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Register",
};

export default function Register() {
	return <RegisterForm />;
}
