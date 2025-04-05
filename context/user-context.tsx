import type { UserProfile } from "@/models/auth";
import { createContext, useContext } from "react";
import type { ReactNode } from "react";

type UserContextType = {
	user: Partial<UserProfile> | null;
	loading: "pending" | "resolved" | "rejected";
};

const UserContext = createContext<UserContextType>({
	user: null,
	loading: "pending",
});

export const UserContextProvider = ({
	children,
	value,
}: {
	children: ReactNode;
	value: UserContextType;
}) => {
	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
	const context = useContext(UserContext);

	if (!context) {
		throw new Error("useUserContext must be used within a UserContextProvider");
	}

	return context;
};
