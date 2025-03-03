import type React from "react";

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
	if (!show) return null;

	return (
		<div
			className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg text-white shadow-lg transition-all duration-300 animate-fade-in z-50 flex items-center ${
				type === "success" ? "bg-green-500" : "bg-red-500"
			}`}
		>
			{type === "success" ? (
				<svg
					className="w-5 h-5 mr-2"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<title>成功</title>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M5 13l4 4L19 7"
					/>
				</svg>
			) : (
				<svg
					className="w-5 h-5 mr-2"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<title>エラー</title>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			)}
			{message}
		</div>
	);
};
