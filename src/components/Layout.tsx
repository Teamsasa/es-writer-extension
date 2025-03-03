import type React from "react";

interface LayoutProps {
	children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 px-4">
			<div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl">
				{children}
			</div>
		</div>
	);
};
