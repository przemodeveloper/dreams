import { LOADING_STATE, type LoadingState } from "@/constants/user-profile";
import { auth } from "@/firebase";
import type { User } from "firebase/auth";
import { useEffect, useState } from "react";

export default function useAuthUser() {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState<LoadingState>(LOADING_STATE.PENDING);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
			if (authUser) {
				setUser(authUser);
				setLoading(LOADING_STATE.RESOLVED);
			} else {
				setUser(null);
				setLoading(LOADING_STATE.RESOLVED);
			}
		});

		return () => unsubscribe();
	}, []);

	return { user, loading };
}
