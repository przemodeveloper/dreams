import { createContext, useContext, useMemo } from "react";
import type { ReactNode } from "react";
import { useSubscribeUserProfile } from "@/hooks/useSubscribeUserProfile";
import { LOADING_STATE, type LoadingState } from "@/constants/user-profile";
import type { UserProfile } from "@/lib/actions";

type UserContextType = {
	user: UserProfile | null;
	loading: LoadingState;
	userId?: string;
};

const UserContext = createContext<UserContextType>({
	user: null,
	loading: LOADING_STATE.PENDING,
	userId: "",
});

export const UserContextProvider = ({
	children,
	userId,
}: {
	children: ReactNode;
	userId?: string;
}) => {
	const { userData, loading } = useSubscribeUserProfile(userId || "");

	const value = useMemo(
		() => ({ user: userData, loading, userId }),
		[userData, loading, userId]
	);

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
	const context = useContext(UserContext);

	if (!context) {
		throw new Error("useUserContext must be used within a UserContextProvider");
	}

	return context;
};
