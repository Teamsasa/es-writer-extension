import type { ReactNode } from "react";

interface ButtonProps {
	onClick: () => void;
	variant?: "primary" | "secondary";
	children: ReactNode;
	disabled?: boolean;
	startIcon?: ReactNode;
	endIcon?: ReactNode;
	fullWidth?: boolean;
	size?: "small" | "medium" | "large";
}

export const Button = ({
	onClick,
	variant = "primary",
	children,
	disabled = false,
	startIcon,
	endIcon,
	fullWidth = true,
	size = "medium",
}: ButtonProps) => {
	// サイズに基づくクラス
	const sizeClasses = {
		small: "text-xs py-1 px-2",
		medium: "text-sm py-2 px-4",
		large: "text-base py-3 px-6",
	}[size];

	// バリアントに基づくクラス
	const variantClasses = {
		primary:
			"bg-primary-main hover:bg-primary-dark text-white dark:bg-primary-light dark:hover:bg-primary-main dark:text-darkmode-text-primary",
		secondary:
			"border border-primary-main text-primary-main hover:bg-primary-main/10 dark:border-primary-light dark:text-primary-light dark:hover:bg-primary-light/20",
	}[variant];

	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={`
				${sizeClasses}
				${variantClasses}
				${fullWidth ? "w-full" : ""}
				rounded-md font-semibold transition-colors duration-200
				flex items-center justify-center gap-2
				disabled:opacity-50 disabled:cursor-not-allowed
				shadow-sm dark:shadow-md
			`}
		>
			{startIcon && <span className="inline-flex">{startIcon}</span>}
			{children}
			{endIcon && <span className="inline-flex">{endIcon}</span>}
		</button>
	);
};
