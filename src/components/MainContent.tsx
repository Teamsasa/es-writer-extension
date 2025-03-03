import { SignInButton, SignedIn, SignedOut } from "@clerk/chrome-extension";
import { useGenAnswer } from "../hooks/genAnswer";
import { Button } from "./Button";

const EXTENSION_URL = chrome.runtime.getURL(".");

const GenerateIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		className="h-5 w-5"
		viewBox="0 0 20 20"
		fill="currentColor"
	>
		<title>回答生成</title>
		<path
			fillRule="evenodd"
			d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
			clipRule="evenodd"
		/>
	</svg>
);

const ProfileIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		className="h-5 w-5"
		viewBox="0 0 20 20"
		fill="currentColor"
	>
		<title>経歴入力</title>
		<path
			fillRule="evenodd"
			d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
			clipRule="evenodd"
		/>
	</svg>
);

export const MainContent = () => {
	const genAnswer = useGenAnswer();

	const handleGenAnswer = async () => {
		try {
			await genAnswer();
		} catch (error) {
			console.error("Error generating answer:", error);
		}
	};

	const handleOpenProfile = () => {
		chrome.tabs.create({
			url: `${EXTENSION_URL}/tabs/profile.html`,
		});
	};

	return (
		<main className="flex-1 flex flex-col items-center justify-center p-6">
			<SignedIn>
				<div className="flex flex-col items-center gap-6 w-full max-w-md">
					<Button onClick={handleGenAnswer}>
						<GenerateIcon />
						回答生成
					</Button>
					<Button onClick={handleOpenProfile} variant="secondary">
						<ProfileIcon />
						経歴入力
					</Button>
				</div>
			</SignedIn>
			<SignedOut>
				<div className="text-center">
					<h2 className="text-2xl font-bold mb-4 text-gray-800">
						ES Writer へようこそ
					</h2>
					<p className="text-gray-600 mb-8">
						ログインして、ES作成支援機能をご利用ください
					</p>
					<div className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 font-medium">
						<SignInButton mode="modal" />
					</div>
				</div>
			</SignedOut>
		</main>
	);
};
