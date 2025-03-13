import { SignInButton, SignedIn, SignedOut } from "@clerk/chrome-extension";

interface MainContentProps {
	onNavigate: (view: "main" | "generate" | "profile") => void;
}

export const MainContent = ({ onNavigate }: MainContentProps) => {
	return (
		<main className="flex-grow flex flex-col items-center justify-center py-4 px-4">
			<SignedIn>
				<div className="flex flex-col items-center w-full max-w-md gap-4">
					<button
						className="w-full bg-primary-main hover:bg-primary-dark text-white dark:bg-primary-light dark:hover:bg-primary-main dark:text-darkmode-text-primary py-3 px-4 rounded-md font-semibold transition-colors duration-200 flex items-center justify-center"
						onClick={() => onNavigate("generate")}
					>
						<svg
							className="w-5 h-5 mr-2"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M13 10V3L4 14h7v7l9-11h-7z"
							/>
						</svg>
						回答生成
					</button>
					<button
						className="w-full border border-primary-main text-primary-main hover:bg-primary-main/10 dark:border-primary-light dark:text-primary-light dark:hover:bg-primary-light/20 py-3 px-4 rounded-md font-semibold transition-colors duration-200 flex items-center justify-center"
						onClick={() => onNavigate("profile")}
					>
						<svg
							className="w-5 h-5 mr-2"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
							/>
						</svg>
						経歴入力
					</button>
				</div>
			</SignedIn>
			<SignedOut>
				<div className="p-6 flex flex-col items-center bg-white dark:bg-darkmode-paper rounded-lg shadow-sm dark:shadow-black/20 dark:border dark:border-darkmode-border">
					<h2 className="text-lg font-bold mb-2 text-gray-900 dark:text-darkmode-text-primary">
						ES Writer へようこそ
					</h2>
					<p className="text-sm text-gray-500 dark:text-darkmode-text-secondary mb-4 text-center">
						ログインして、ES作成支援機能をご利用ください
					</p>
					<div className="bg-primary-main hover:bg-primary-dark text-white dark:bg-primary-light dark:hover:bg-primary-main rounded-md px-4 py-2 transition-colors">
						<SignInButton mode="modal" />
					</div>
				</div>
			</SignedOut>
		</main>
	);
};
