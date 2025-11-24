import { createContext, useCallback, useContext } from "react";
import type { ReactNode } from "react";
import { toast, ToastContainer } from "react-toastify";

const NotificationContext = createContext({
	notify: (message: string) =>
		toast(message, { theme: "dark", hideProgressBar: true }),
});

export const NotificationContextProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	const notify = useCallback((message: string) => toast(message), []);

	return (
		<NotificationContext.Provider value={{ notify }}>
			{children}
			<ToastContainer
				position="top-right"
				theme="light"
				autoClose={3000}
				closeOnClick
				style={
					{
						"--toastify-color-progress-light": "#4f46e5",
					} as React.CSSProperties
				}
			/>
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
