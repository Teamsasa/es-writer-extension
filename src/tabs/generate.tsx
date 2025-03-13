import { ClerkProvider, SignedIn, useAuth } from "@clerk/chrome-extension";
import { useState } from "react";
import { Footer } from "~components/Footer";
import { Header } from "~components/Header";
import { useGenAnswer } from "~hooks/genAnswer";
import { useCompanySearch } from "~hooks/useCompanySearch";
import { ThemeWrapper } from "~theme";
import type { Company, LLMModel } from "~types";
import "~style.css";

const PUBLISHABLE_KEY = process.env.PLASMO_PUBLIC_CLERK_PUBLISHABLE_KEY;
const EXTENSION_URL = chrome.runtime.getURL(".");

if (!PUBLISHABLE_KEY) {
	throw new Error(
		"Please add the PLASMO_PUBLIC_CLERK_PUBLISHABLE_KEY to the .env.development file",
	);
}

function GenerateTabContent() {
	const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
	const [selectedModel, setSelectedModel] =
		useState<LLMModel>("gemini-2.0-flash");
	const {
		companies,
		isLoading,
		error,
		searchQuery,
		updateSearchQuery,
		searchCompanies,
	} = useCompanySearch();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [generateSuccess, setGenerateSuccess] = useState(false);
	const [isCompanyMenuOpen, setIsCompanyMenuOpen] = useState(false);
	const [isModelMenuOpen, setIsModelMenuOpen] = useState(false);
	const genAnswer = useGenAnswer();

	// 企業検索フォームでenterキーが押された時に検索を実行
	const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();
			searchCompanies();
		}
	};

	const handleCompanyInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		updateSearchQuery(e.target.value);
		if (!e.target.value) {
			setSelectedCompany(null);
		}
	};

	const handleCompanySelect = (company: Company) => {
		setSelectedCompany(company);
		updateSearchQuery(company.companyName);
		setIsCompanyMenuOpen(false);
	};

	const handleModelChange = (model: LLMModel) => {
		setSelectedModel(model);
		setIsModelMenuOpen(false);
	};

	const handleGenerate = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!selectedCompany) return;

		setIsSubmitting(true);
		setGenerateSuccess(false);

		try {
			await genAnswer({
				companyName: selectedCompany.companyName,
				companyId: selectedCompany.companyId,
				model: selectedModel,
			});
			setGenerateSuccess(true);
		} catch (error) {
			console.error("回答生成エラー:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	// モデルの説明文を取得
	const getModelDescription = (model: LLMModel): string => {
		switch (model) {
			case "gemini-2.0-flash":
				return "バランスの取れた速度と性能を提供";
			case "gemini-2.0-flash-lite":
				return "超高速処理に最適化された軽量版";
			case "gemini-2.0-flash-thinking-exp":
				return "より深い考察と高品質な出力を重視";
			default:
				return "";
		}
	};

	// モデル名を整形して表示
	const getModelDisplayName = (model: LLMModel): string => {
		switch (model) {
			case "gemini-2.0-flash":
				return "Gemini 2.0 Flash";
			case "gemini-2.0-flash-lite":
				return "Gemini 2.0 Flash Lite";
			case "gemini-2.0-flash-thinking-exp":
				return "Gemini 2.0 Flash Thinking";
			default:
				return model;
		}
	};

	return (
		<div className="max-w-3xl mx-auto py-8 px-4">
			<div className="bg-white dark:bg-darkmode-paper p-6 rounded-lg shadow-md dark:shadow-black/30 dark:border dark:border-darkmode-border">
				<h1 className="text-xl font-bold mb-4 text-gray-900 dark:text-darkmode-text-primary">
					回答生成
				</h1>

				<form onSubmit={handleGenerate}>
					<div className="mt-6">
						<h2 className="text-lg font-medium mb-2 text-gray-900 dark:text-darkmode-text-primary">
							会社情報
						</h2>
						<div className="mb-6">
							<div className="relative">
								<div className="flex">
									<div className="relative flex-1">
										<input
											type="text"
											value={searchQuery}
											onChange={handleCompanyInputChange}
											onKeyDown={handleSearchKeyDown}
											onFocus={() => setIsCompanyMenuOpen(true)}
											placeholder="会社名を入力して検索"
											required
											className="w-full px-3 py-3 text-sm bg-white dark:bg-darkmode-paper border border-gray-300 dark:border-darkmode-border rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary-main dark:focus:ring-primary-light focus:border-primary-main dark:focus:border-primary-light transition-colors dark:text-darkmode-text-primary"
										/>
										{isLoading && (
											<div className="absolute right-3 top-1/2 transform -translate-y-1/2">
												<div className="animate-spin h-5 w-5 border-2 border-primary-main dark:border-primary-light border-t-transparent rounded-full"></div>
											</div>
										)}
									</div>
									<button
										type="button"
										onClick={() => searchCompanies()}
										disabled={isLoading || searchQuery.trim().length < 2}
										className="px-4 py-3 bg-primary-main hover:bg-primary-dark text-white dark:bg-primary-light dark:hover:bg-primary-main dark:text-darkmode-text-primary rounded-r-md disabled:opacity-50 disabled:cursor-not-allowed"
									>
										<svg
											className="w-5 h-5"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
											/>
										</svg>
									</button>
								</div>

								{isCompanyMenuOpen && companies.length > 0 && (
									<div className="absolute z-10 w-full mt-1 bg-white dark:bg-darkmode-paper border border-gray-200 dark:border-darkmode-border rounded-md shadow-lg max-h-48 overflow-y-auto">
										{companies.map((company) => (
											<div
												key={company.companyId}
												onClick={() => handleCompanySelect(company)}
												className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-darkmode-border cursor-pointer"
											>
												<div className="font-medium text-sm dark:text-darkmode-text-primary">
													{company.companyName}
												</div>
												<div className="text-xs text-gray-500 dark:text-darkmode-text-secondary">
													{company.companyId}
												</div>
											</div>
										))}
									</div>
								)}

								{error && <p className="text-xs text-red-500 mt-1">{error}</p>}
							</div>
							<p className="text-xs text-gray-500 dark:text-darkmode-text-secondary mt-1">
								会社名を入力して検索ボタンをクリックしてください
							</p>
						</div>
					</div>

					<div className="mt-6">
						<h2 className="text-lg font-medium mb-2 text-gray-900 dark:text-darkmode-text-primary">
							生成設定
						</h2>
						<div className="mb-6">
							<div className="relative">
								<button
									type="button"
									onClick={() => setIsModelMenuOpen(!isModelMenuOpen)}
									className="w-full px-3 py-3 text-sm bg-white dark:bg-darkmode-paper border border-gray-300 dark:border-darkmode-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-main dark:focus:ring-primary-light focus:border-primary-main transition-colors dark:text-darkmode-text-primary text-left flex justify-between items-center"
								>
									<span className="block">
										<span className="font-medium block">
											{getModelDisplayName(selectedModel)}
										</span>
										<span className="text-xs text-gray-500 dark:text-darkmode-text-secondary">
											{getModelDescription(selectedModel)}
										</span>
									</span>
									<svg
										className="w-4 h-4"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M19 9l-7 7-7-7"
										/>
									</svg>
								</button>

								{isModelMenuOpen && (
									<div className="absolute z-10 w-full mt-1 bg-white dark:bg-darkmode-paper border border-gray-200 dark:border-darkmode-border rounded-md shadow-lg">
										{[
											"gemini-2.0-flash",
											"gemini-2.0-flash-lite",
											"gemini-2.0-flash-thinking-exp",
										].map((model) => (
											<div
												key={model}
												onClick={() => handleModelChange(model as LLMModel)}
												className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-darkmode-border cursor-pointer"
											>
												<div className="font-medium text-sm dark:text-darkmode-text-primary">
													{getModelDisplayName(model as LLMModel)}
												</div>
												<div className="text-xs text-gray-500 dark:text-darkmode-text-secondary">
													{getModelDescription(model as LLMModel)}
												</div>
											</div>
										))}
									</div>
								)}
							</div>
						</div>
					</div>

					<div className="mt-8 flex justify-center">
						<button
							type="submit"
							disabled={isSubmitting || !selectedCompany}
							className="bg-primary-main hover:bg-primary-dark text-white dark:bg-primary-light dark:hover:bg-primary-main dark:text-darkmode-text-primary py-3 px-8 min-w-48 rounded-md font-semibold transition-colors duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{isSubmitting ? (
								<>
									<div className="animate-spin -ml-1 mr-2 h-5 w-5 border-2 border-white dark:border-darkmode-text-primary border-t-transparent rounded-full"></div>
									生成中...
								</>
							) : (
								"回答を生成する"
							)}
						</button>
					</div>

					{generateSuccess && (
						<div className="mt-4 text-center text-green-600 dark:text-green-400">
							回答の生成が完了しました！
						</div>
					)}
				</form>
			</div>
		</div>
	);
}

export default function GenerateTab() {
	return (
		<ThemeWrapper>
			<ClerkProvider
				publishableKey={PUBLISHABLE_KEY}
				afterSignOutUrl={`${EXTENSION_URL}/popup.html`}
				signInFallbackRedirectUrl={`${EXTENSION_URL}/popup.html`}
				signUpFallbackRedirectUrl={`${EXTENSION_URL}/popup.html`}
			>
				<div className="flex flex-col min-h-screen bg-gray-50 dark:bg-darkmode-bg">
					<Header />
					<main className="flex-grow py-4">
						<SignedIn>
							<GenerateTabContent />
						</SignedIn>
					</main>
					<Footer />
				</div>
			</ClerkProvider>
		</ThemeWrapper>
	);
}
