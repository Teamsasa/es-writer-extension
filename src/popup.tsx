import { ClerkProvider } from "@clerk/chrome-extension";
import { useState } from "react";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { MainContent } from "./components/MainContent";
import { GeneratePage } from "./pages/GeneratePage";
import { ThemeWrapper } from "./theme";
import "~style.css";

const PUBLISHABLE_KEY = process.env.PLASMO_PUBLIC_CLERK_PUBLISHABLE_KEY;
const EXTENSION_URL = chrome.runtime.getURL(".");

if (!PUBLISHABLE_KEY) {
	throw new Error(
		"Please add the PLASMO_PUBLIC_CLERK_PUBLISHABLE_KEY to the .env.development file",
	);
}

type PopupView = "main" | "generate" | "profile";

function IndexPopup() {
	const [currentView, setCurrentView] = useState<PopupView>("main");

	const navigateTo = (view: PopupView) => {
		setCurrentView(view);
	};

	const renderContent = () => {
		switch (currentView) {
			case "generate":
				return <GeneratePage onBack={() => navigateTo("main")} />;
			case "profile":
				chrome.tabs.create({ url: chrome.runtime.getURL("tabs/profile.html") });
				setCurrentView("main");
				return <MainContent onNavigate={navigateTo} />;
			default:
				return <MainContent onNavigate={navigateTo} />;
		}
	};

	return (
		<ThemeWrapper>
			<ClerkProvider
				publishableKey={PUBLISHABLE_KEY}
				afterSignOutUrl={`${EXTENSION_URL}/popup.html`}
				signInFallbackRedirectUrl={`${EXTENSION_URL}/popup.html`}
				signUpFallbackRedirectUrl={`${EXTENSION_URL}/popup.html`}
			>
				<div className="flex flex-col h-[400px] w-[450px] bg-white dark:bg-darkmode-bg text-gray-900 dark:text-darkmode-text-primary">
					<Header />
					{renderContent()}
					<Footer />
				</div>
			</ClerkProvider>
		</ThemeWrapper>
	);
}

export default IndexPopup;
