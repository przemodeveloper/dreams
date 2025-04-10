import { auth } from "@/firebase";
import type { UserProfile } from "@/models/auth";
import { useEffect, useState } from "react";

export default function useAuthUser() {
	const [user, setUser] = useState<Partial<UserProfile> | null>(null);
	const [loading, setLoading] = useState<"pending" | "resolved" | "rejected">(
		"pending"
	);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
			if (authUser) {
				setUser(authUser);
				setLoading("resolved");
			} else {
				setUser(null);
				setLoading("resolved");
			}
		});

		return () => unsubscribe();
	}, []);

	return { user, loading };
}
