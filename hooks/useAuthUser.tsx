import { auth, db, provider } from "@/firebase";
import type { UserProfile } from "@/models/auth";
import { ROUTES } from "@/routes/routes";
import { signInWithPopup } from "firebase/auth";
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

	const signIn = async () => {
		try {
			const result = await signInWithPopup(auth, provider);
			const authUser = result.user;

			const snapshot = await getSnapshot(authUser.uid);

			if (snapshot.empty) {
				router.push(ROUTES.SET_UP_PROFILE);
			} else {
				router.push(ROUTES.USER_PROFILE);
			}
			setLoading("resolved");
		} catch (error) {
			const err = error as Error;
			setLoading("rejected");
			throw new Error(err.message);
		}
	};

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

	return { user, signIn, loading };
}
