"use client";

import Login from "@/components/auth/Login/Login";
import { useUserContext } from "@/context/user-context";

export default function Home() {
	const { userId } = useUserContext();

	return (
		<>
			{!userId && (
				<div className="flex justify-center flex-col items-center h-[calc(100vh-60px)]">
					<h1 className="font-primary mb-2 text-emerald-600">Dreams</h1>
					<Login />
				</div>
			)}
		</>
	);
}
