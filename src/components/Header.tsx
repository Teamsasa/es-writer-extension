import {
	SignInButton,
	SignedIn,
	SignedOut,
	UserButton,
} from "@clerk/chrome-extension";

export const Header = () => {
	return (
		<header className="w-full p-4 bg-white shadow-sm flex justify-between items-center">
			<h1 className="text-xl font-bold text-blue-700">ES Writer</h1>
			<div>
				<SignedOut>
					<div className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">
						<SignInButton mode="modal" />
					</div>
				</SignedOut>
				<SignedIn>
					<div className="flex items-center gap-4">
						<UserButton />
					</div>
				</SignedIn>
			</div>
		</header>
	);
};
