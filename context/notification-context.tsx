import { createContext, ReactNode, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";

const NotificationContext = createContext({
	notify: (message: string) => console.log(message),
});

export const NotificationContextProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	const notify = (message: string) =>
		toast(message, { theme: "dark", hideProgressBar: true });

	return (
		<NotificationContext.Provider value={{ notify }}>
			{children}
			<ToastContainer />
		</NotificationContext.Provider>
	);
};

export const useNotificationContext = () => {
	const context = useContext(NotificationContext);

	if (!context) {
		throw new Error(
			"useNotificationContext must be used within a NotificationContextProvider"
		);
	}

	return context;
};
