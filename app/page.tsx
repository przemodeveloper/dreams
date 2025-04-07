"use client";

import Login from "@/components/Login/Login";
import { useUserContext } from "@/context/user-context";

export default function Home() {
	const { isLoggedIn } = useUserContext();

	return (
		<>
			{!isLoggedIn && (
				<div className="flex justify-center flex-col items-center h-[calc(100vh-60px)]">
					<h1 className="font-primary mb-2">Dreams</h1>
					<Login />
				</div>
			)}
		</>
	);
}
