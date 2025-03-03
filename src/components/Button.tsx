import type { ReactNode } from "react";

interface ButtonProps {
	onClick: () => void;
	variant?: "primary" | "secondary";
	children: ReactNode;
}

export const Button = ({
	onClick,
	variant = "primary",
	children,
}: ButtonProps) => {
	const baseStyles =
		"w-full font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 shadow-sm";
	const variantStyles = {
		primary: "bg-blue-600 hover:bg-blue-700 text-white",
		secondary: "bg-white border border-blue-600 text-blue-600 hover:bg-blue-50",
	};

	return (
		<button
			type="button"
			onClick={onClick}
			className={`${baseStyles} ${variantStyles[variant]}`}
		>
			{children}
		</button>
	);
};
