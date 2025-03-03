import type React from "react";
import ReactDOM from "react-dom";
import "~style.css";

import { Layout } from "../components/Layout";
import { NotificationSnackbar } from "../components/NotificationSnackbar";
import { TextareaField } from "../components/TextareaField";
import { useNotification } from "../hooks/useNotification";
import { useProfileData } from "../hooks/useProfileData";

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
		<Layout>
			<h1 className="text-3xl font-bold text-center mb-2 text-blue-700">
				プロフィール情報
			</h1>
			<p className="text-gray-500 text-center mb-8">
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
					className={`w-full py-3 px-6 rounded-lg text-white font-medium text-lg transition-all duration-200 ${
						isSaving
							? "bg-blue-400 cursor-not-allowed"
							: "bg-blue-600 hover:bg-blue-700 hover:shadow-md"
					}`}
				>
					{isSaving ? "保存中..." : "プロフィールを保存"}
				</button>
			</form>

			<NotificationSnackbar
				type={notification.type}
				message={notification.message}
				show={notification.show}
			/>
		</Layout>
	);
};

ReactDOM.render(<ProfileForm />, document.getElementById("root"));
