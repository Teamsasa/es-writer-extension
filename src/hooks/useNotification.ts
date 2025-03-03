import { useState } from "react";

interface NotificationState {
	show: boolean;
	type: "success" | "error" | "";
	message: string;
}

export const useNotification = () => {
	const [notification, setNotification] = useState<NotificationState>({
		show: false,
		type: "",
		message: "",
	});

	const showNotification = (type: "success" | "error", message: string) => {
		setNotification({
			show: true,
			type,
			message,
		});

		setTimeout(() => {
			setNotification({ show: false, type: "", message: "" });
		}, 3000);
	};

	return {
		notification,
		showNotification,
	};
};
