import type React from "react";

interface LayoutProps {
	children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div className="min-h-screen bg-gray-50 dark:bg-darkmode-bg py-8 px-4">
			<div className="max-w-3xl mx-auto">
				<div className="bg-white dark:bg-darkmode-paper p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 dark:shadow-black/30 dark:border dark:border-darkmode-border">
					{children}
				</div>
			</div>
		</div>
	);
};
