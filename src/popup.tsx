import { ClerkProvider } from "@clerk/chrome-extension";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { MainContent } from "./components/MainContent";
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
			<div className="flex flex-col h-[350px] w-[450px] bg-gradient-to-b from-blue-50 to-white">
				<Header />
				<MainContent />
				<Footer />
			</div>
		</ClerkProvider>
	);
}

export default IndexPopup;
