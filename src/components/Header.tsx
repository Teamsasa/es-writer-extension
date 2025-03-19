import {
	SignInButton,
	SignedIn,
	SignedOut,
	UserButton,
} from "@clerk/chrome-extension";
import { ThemeToggle } from "./ThemeToggle";

export const Header = () => {
	return (
		<header className="py-2 px-4 flex items-center justify-between border-b border-gray-200 dark:border-darkmode-border bg-white dark:bg-darkmode-paper">
			<h1 className="text-lg font-bold text-primary-main dark:text-primary-light">
				ES Writer
			</h1>
			<div className="flex items-center gap-3">
				<ThemeToggle />
				<SignedIn>
					<UserButton afterSignOutUrl="/popup.html" />
				</SignedIn>
			</div>
		</header>
	);
};
