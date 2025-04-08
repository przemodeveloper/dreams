import type { UserProfile } from "@/models/auth";
import { createContext, useContext, useMemo } from "react";
import type { ReactNode } from "react";
import { useSubscribeUserProfile } from "@/hooks/useSubscribeUserProfile";

type UserContextType = {
	user: Partial<UserProfile> | null;
	loading: "pending" | "resolved" | "error" | "idle";
	userId?: string;
};

const UserContext = createContext<UserContextType>({
	user: null,
	loading: "pending",
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
