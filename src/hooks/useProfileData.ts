import { useEffect, useState } from "react";

const api_endpoint = process.env.PLASMO_PUBLIC_API_ENDPOINT;

interface ProfileData {
	work: string;
	skills: string;
	selfPR: string;
	futureGoals: string;
}

interface UseProfileDataReturn {
	profileData: ProfileData;
	setProfileData: (data: Partial<ProfileData>) => void;
	isSaving: boolean;
	saveProfile: () => Promise<boolean>;
}

export const useProfileData = (): UseProfileDataReturn => {
	const [profileData, setProfileDataState] = useState<ProfileData>({
		work: "",
		skills: "",
		selfPR: "",
		futureGoals: "",
	});
	const [isSaving, setIsSaving] = useState(false);

	useEffect(() => {
		const fetchProfileData = async () => {
			try {
				const response = await fetch(`${api_endpoint}/api/experience`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						IdpHeader: process.env.PLASMO_PUBLIC_IDP,
					},
				});

				if (response.ok) {
					const data = await response.json();
					setProfileDataState({
						work: data.work || "",
						skills: data.skills || "",
						selfPR: data.selfPR || "",
						futureGoals: data.futureGoals || "",
					});
				} else {
					console.error("Failed to fetch profile data");
				}
			} catch (error) {
				console.error("Error fetching profile data:", error);
			}
		};

		fetchProfileData();
	}, []);

	const setProfileData = (data: Partial<ProfileData>) => {
		setProfileDataState((prev) => ({ ...prev, ...data }));
	};

	const saveProfile = async (): Promise<boolean> => {
		setIsSaving(true);
		try {
			const response = await fetch(`${api_endpoint}/api/experience`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					IdpHeader: process.env.PLASMO_PUBLIC_IDP,
				},
				body: JSON.stringify(profileData),
			});

			return response.ok;
		} catch (error) {
			console.error("Error saving profile data:", error);
			return false;
		} finally {
			setIsSaving(false);
		}
	};

	return {
		profileData,
		setProfileData,
		isSaving,
		saveProfile,
	};
};
