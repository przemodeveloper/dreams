import { auth, db } from "@/firebase";
import type { UserProfile } from "@/models/auth";
import { ROUTES } from "@/routes/routes";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function useAuthUser() {
	const [user, setUser] = useState<Partial<UserProfile> | null>(null);
	const [loading, setLoading] = useState<"pending" | "resolved" | "rejected">(
		"pending"
	);
	const router = useRouter();

	const getSnapshot = useCallback(async (userId: string) => {
		const userProfileCollection = collection(
			db,
			"profiles",
			userId,
			"userProfile"
		);
		const snapshot = await getDocs(userProfileCollection);
		return snapshot;
	}, []);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
			if (authUser) {
				setUser(authUser);
				const snapshot = await getSnapshot(authUser.uid);
				if (snapshot.empty) {
					router.push(ROUTES.SET_UP_PROFILE);
				} else {
					router.push(ROUTES.USER_PROFILE);
				}
			} else {
				setUser(null);
				setLoading("resolved");
			}
		});

		return () => unsubscribe();
	}, [router, getSnapshot]);

	return { user, loading };
}
