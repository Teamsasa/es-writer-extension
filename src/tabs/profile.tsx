import ReactDOM from "react-dom";

import type React from "react";
import { useEffect, useState } from "react";

import "~style.css";

const api_endpoint = process.env.PLASMO_PUBLIC_API_ENDPOINT;

const ProfileForm = () => {
	const [workExperience, setWorkExperience] = useState("");
	const [skills, setSkills] = useState("");
	const [selfPR, setSelfPR] = useState("");
	const [futureGoals, setFutureGoals] = useState("");
	const [isSaving, setIsSaving] = useState(false);
	const [notification, setNotification] = useState({ show: false, type: "", message: "" });

	useEffect(() => {
		const fetchProfileData = async () => {
			try {
				const response = await fetch(`${api_endpoint}/api/experience`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				});

				if (response.ok) {
					const data = await response.json();
					setWorkExperience(data.workExperience || "");
					setSkills(data.skills || "");
					setSelfPR(data.selfPR || "");
					setFutureGoals(data.futureGoals || "");
				} else {
					console.error("Failed to fetch profile data");
				}
			} catch (error) {
				console.error("Error fetching profile data:", error);
			}
		};

		fetchProfileData();
	}, []);

	const handleProfileSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		setIsSaving(true);

		try {
			const response = await fetch(`${api_endpoint}/api/experience`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ workExperience, skills, selfPR, futureGoals }),
			});

			if (response.ok) {
				setNotification({
					show: true,
					type: "success",
					message: "プロフィールが正常に保存されました",
				});
			} else {
				setNotification({
					show: true,
					type: "error",
					message: "プロフィールの保存に失敗しました",
				});
			}
		} catch (error) {
			setNotification({
				show: true,
				type: "error",
				message: "エラーが発生しました、再試行してください",
			});
		} finally {
			setIsSaving(false);
			setTimeout(() => {
				setNotification({ show: false, type: "", message: "" });
			}, 3000);
		}
	};

	const TextareaField = ({ label, value, onChange, placeholder }) => (
		<div className="mb-6">
			<label className="block text-gray-700 font-medium mb-2">{label}</label>
			<textarea
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				required
				className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm resize-none bg-white"
			/>
		</div>
	);

	return (
		<div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 px-4">
			<div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl">
				<h1 className="text-3xl font-bold text-center mb-2 text-blue-700">プロフィール情報</h1>
				<p className="text-gray-500 text-center mb-8">あなたの経験やスキルを入力してください</p>
				
				{notification.show && (
					<div className={`mb-6 p-4 rounded-lg text-white text-center ${
						notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
					}`}>
						{notification.message}
					</div>
				)}

				<form onSubmit={handleProfileSubmit}>
					<TextareaField
						label="略歴（アルバイト、インターン、イベントなど）"
						value={workExperience}
						onChange={(e) => setWorkExperience(e.target.value)}
						placeholder="あなたのこれまでの経験を入力してください"
					/>
					
					<TextareaField
						label="スキル・資格・研究内容"
						value={skills}
						onChange={(e) => setSkills(e.target.value)}
						placeholder="あなたが持つスキルや資格、研究内容を入力してください"
					/>
					
					<TextareaField
						label="自己PR"
						value={selfPR}
						onChange={(e) => setSelfPR(e.target.value)}
						placeholder="あなたの長所やアピールポイントを入力してください"
					/>
					
					<TextareaField
						label="将来の目標とキャリアプラン"
						value={futureGoals}
						onChange={(e) => setFutureGoals(e.target.value)}
						placeholder="あなたの将来像やキャリアの展望を入力してください"
					/>
					
					<button
						type="submit"
						disabled={isSaving}
						className={`w-full py-3 px-6 rounded-lg text-white font-medium text-lg transition-all duration-200 ${
							isSaving 
								? 'bg-blue-400 cursor-not-allowed' 
								: 'bg-blue-600 hover:bg-blue-700 hover:shadow-md'
						}`}
					>
						{isSaving ? "保存中..." : "プロフィールを保存"}
					</button>
				</form>
			</div>
		</div>
	);
};

ReactDOM.render(<ProfileForm />, document.getElementById("root"));
