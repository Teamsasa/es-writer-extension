import {
	ClerkProvider,
	SignInButton,
	SignedIn,
	SignedOut,
	UserButton,
} from "@clerk/chrome-extension";

import genAnswer from "~genAnswer";

import "~style.css";

const PUBLISHABLE_KEY = process.env.PLASMO_PUBLIC_CLERK_PUBLISHABLE_KEY;
const EXTENSION_URL = chrome.runtime.getURL(".");

if (!PUBLISHABLE_KEY) {
	throw new Error(
		"Please add the PLASMO_PUBLIC_CLERK_PUBLISHABLE_KEY to the .env.development file",
	);
}

function IndexPopup() {
	return (
		<ClerkProvider
			publishableKey={PUBLISHABLE_KEY}
			afterSignOutUrl={`${EXTENSION_URL}/popup.html`}
			signInFallbackRedirectUrl={`${EXTENSION_URL}/popup.html`}
			signUpFallbackRedirectUrl={`${EXTENSION_URL}/popup.html`}
		>
			<div className="flex items-center justify-center h-[600px] w-[800px] flex-col">
				<header className="w-full">
					<SignedOut>
						<SignInButton mode="modal" />
					</SignedOut>
					<SignedIn>
						<UserButton />
						<button
							type="button"
							onClick={async () => {
								try {
									await genAnswer();
								} catch (error) {
									console.error("Error generating answer:", error);
								}
							}}
						>
							回答生成
						</button>
						<button
							type="button"
							onClick={() => {
								chrome.tabs.create({
									url: `${EXTENSION_URL}/tabs/profile.html`,
								});
							}}
						>
							経歴入力
						</button>
					</SignedIn>
				</header>
			</div>
		</ClerkProvider>
	);
}

export default IndexPopup;
