import type React from "react";
import ReactDOM from "react-dom";
import "~style.css";

import { ClerkProvider } from "@clerk/chrome-extension";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { NotificationSnackbar } from "../components/NotificationSnackbar";
import { TextareaField } from "../components/TextareaField";
import { useNotification } from "../hooks/useNotification";
import { useProfileData } from "../hooks/useProfileData";
import { ThemeWrapper } from "../theme";

const ProfileForm: React.FC = () => {
	const { profileData, setProfileData, isSaving, saveProfile } =
		useProfileData();
	const { notification, showNotification } = useNotification();

	const handleProfileSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		const success = await saveProfile();

		if (success) {
			showNotification("success", "プロフィールが正常に保存されました");
		} else {
			showNotification("error", "プロフィールの保存に失敗しました");
		}
	};

	return (
		<div className="flex flex-col h-screen overflow-hidden">
			<div className="fixed top-0 left-0 right-0 w-full z-50 bg-white dark:bg-darkmode-paper shadow-md">
				<Header />
			</div>
			<main className="flex-grow overflow-y-auto overflow-x-hidden py-6 px-4 mt-14 mb-14">
				<h1 className="text-2xl font-bold text-center text-primary-main dark:text-primary-light mb-1">
					プロフィール情報
				</h1>
				<p className="text-center text-gray-600 dark:text-darkmode-text-secondary mb-8">
					あなたの経験やスキルを入力してください
				</p>

				<form onSubmit={handleProfileSubmit}>
					<TextareaField
						label="略歴（アルバイト、インターン、イベントなど）"
						value={profileData.work}
						onChange={(e) => setProfileData({ work: e.target.value })}
						placeholder="あなたのこれまでの経験を入力してください"
					/>

					<TextareaField
						label="スキル・資格・研究内容"
						value={profileData.skills}
						onChange={(e) => setProfileData({ skills: e.target.value })}
						placeholder="あなたが持つスキルや資格、研究内容を入力してください"
					/>

					<TextareaField
						label="自己PR"
						value={profileData.selfPR}
						onChange={(e) => setProfileData({ selfPR: e.target.value })}
						placeholder="あなたの長所やアピールポイントを入力してください"
					/>

					<TextareaField
						label="将来の目標とキャリアプラン"
						value={profileData.futureGoals}
						onChange={(e) => setProfileData({ futureGoals: e.target.value })}
						placeholder="あなたの将来像やキャリアの展望を入力してください"
					/>

					<button
						type="submit"
						disabled={isSaving}
						className="w-full bg-primary-main hover:bg-primary-dark text-white dark:bg-primary-light dark:hover:bg-primary-main dark:text-darkmode-text-primary py-3 px-4 rounded-md font-semibold transition-colors duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{isSaving ? (
							<>
								<div className="animate-spin h-5 w-5 mr-2 border-2 border-white dark:border-darkmode-text-primary border-t-transparent rounded-full" />
								保存中...
							</>
						) : (
							"プロフィールを保存"
						)}
					</button>
				</form>

				<NotificationSnackbar
					type={notification.type}
					message={notification.message}
					show={notification.show}
				/>
			</main>
			<div className="fixed bottom-0 left-0 right-0 w-full z-50 bg-white dark:bg-darkmode-paper border-t border-gray-200 dark:border-darkmode-border">
				<Footer />
			</div>
		</div>
	);
};

const ProfilePage = () => {
	return (
		<ThemeWrapper>
			<ClerkProvider
				publishableKey={process.env.PLASMO_PUBLIC_CLERK_PUBLISHABLE_KEY}
			>
				<ProfileForm />
			</ClerkProvider>
		</ThemeWrapper>
	);
};

ReactDOM.render(<ProfilePage />, document.getElementById("root"));
