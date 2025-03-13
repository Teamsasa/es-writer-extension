import type React from "react";
import { useEffect, useState } from "react";

interface NotificationSnackbarProps {
	type: "success" | "error" | "";
	message: string;
	show: boolean;
}

export const NotificationSnackbar: React.FC<NotificationSnackbarProps> = ({
	type,
	message,
	show,
}) => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		if (show) {
			setIsVisible(true);
			const timer = setTimeout(() => setIsVisible(false), 4000);
			return () => clearTimeout(timer);
		}
	}, [show]);

	if (!show || !type || !isVisible) return null;

	const bgColor =
		type === "success"
			? "bg-green-500 dark:bg-green-600"
			: "bg-red-500 dark:bg-red-600";

	return (
		<div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
			<div
				className={`${bgColor} text-white px-4 py-3 rounded-md shadow-lg dark:shadow-black/50 flex items-center border dark:border-darkmode-border`}
			>
				<svg
					className="w-5 h-5 mr-2"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
					role="img"
					aria-labelledby="notificationIcon"
				>
					<title id="notificationIcon">
						{type === "success" ? "成功" : "エラー"}
					</title>
					{type === "success" ? (
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M5 13l4 4L19 7"
						/>
					) : (
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					)}
				</svg>
				{message}
			</div>
		</div>
	);
};
