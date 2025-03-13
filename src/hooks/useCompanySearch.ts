import { useAuth } from "@clerk/chrome-extension";
import { useState } from "react";
import type { Company } from "../types";

const API_ENDPOINT = process.env.PLASMO_PUBLIC_API_ENDPOINT || "";

export const useCompanySearch = () => {
	const { getToken } = useAuth();
	const [isLoading, setIsLoading] = useState(false);
	const [companies, setCompanies] = useState<Company[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [searchQuery, setSearchQuery] = useState<string>("");

	const updateSearchQuery = (query: string) => {
		setSearchQuery(query);
	};

	const searchCompanies = async () => {
		if (!searchQuery || searchQuery.trim().length < 2) {
			setCompanies([]);
			return;
		}

		setIsLoading(true);
		setError(null);

		try {
			const token = await getToken();
			const response = await fetch(
				`${API_ENDPOINT}/api/companies/search?keyword=${encodeURIComponent(searchQuery)}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						IdpHeader: process.env.PLASMO_PUBLIC_IDP_HEADER,
					},
				}
			);
			
			if (!response.ok) {
				switch (response.status) {
					case 401:
						throw new Error("認証エラーが発生しました。再度ログインしてください。");
					case 404:
						throw new Error("リソースが見つかりませんでした。");
					case 500:
						throw new Error("サーバーエラーが発生しました。しばらく時間をおいて再度お試しください。");
					default:
						throw new Error(`APIエラー: ${response.status}`);
				}
			}

			const data = await response.json();
			setCompanies(data);
		} catch (err) {
			console.error("企業検索エラー:", err);
			setError(err instanceof Error ? err.message : "企業検索中にエラーが発生しました");
			setCompanies([]);
		} finally {
			setIsLoading(false);
		}
	};

	return {
		companies,
		isLoading,
		error,
		searchQuery,
		updateSearchQuery,
		searchCompanies,
	};
}; 