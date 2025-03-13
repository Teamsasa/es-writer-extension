import { useState } from "react";
import { useGenAnswer } from "~hooks/genAnswer";
import { useCompanySearch } from "~hooks/useCompanySearch";
import type { Company, LLMModel } from "~types";

interface GeneratePageProps {
	onBack: () => void;
}

export const GeneratePage = ({ onBack }: GeneratePageProps) => {
	const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
	const [selectedModel, setSelectedModel] =
		useState<LLMModel>("gemini-2.0-flash");
	const { companies, isLoading, error, searchQuery, updateSearchQuery, searchCompanies } = useCompanySearch();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [generateSuccess, setGenerateSuccess] = useState(false);
	const [isCompanyMenuOpen, setIsCompanyMenuOpen] = useState(false);
	const [isModelMenuOpen, setIsModelMenuOpen] = useState(false);
	const genAnswer = useGenAnswer();

	// 企業検索フォームでenterキーが押された時に検索を実行
	const handleSearchKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
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
		updateSearchQuery(company.name);
		setIsCompanyMenuOpen(false);
	};

	const handleModelChange = (model: LLMModel) => {
		setSelectedModel(model);
		setIsModelMenuOpen(false);
	};

	const handleGenerate = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!selectedCompany) return;

		console.log("企業情報:", { 
			companyName: selectedCompany.name, 
			companyId: selectedCompany.corporate_number 
		});

		setIsSubmitting(true);
		setGenerateSuccess(false);
		
		try {
			await genAnswer({
				companyName: selectedCompany.name,
				companyId: selectedCompany.corporate_number,
				model: selectedModel,
			});
			setGenerateSuccess(true);
			// 成功メッセージを3秒後に非表示にする
			setTimeout(() => {
				setGenerateSuccess(false);
			}, 3000);
		} catch (error) {
			console.error("回答生成エラー:", error);
			alert("回答生成中にエラーが発生しました。もう一度お試しください。");
		} finally {
			setIsSubmitting(false);
		}
	};

	// モデルの説明文を取得
	const getModelDescription = (model: LLMModel): string => {
		switch (model) {
			case "gemini-2.0-flash":
				return "バランスの取れた速度と性能";
			case "gemini-2.0-flash-lite":
				return "超高速処理に最適化";
			case "gemini-2.0-flash-thinking-exp":
				return "より深い考察と高品質";
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
		<div className="py-2 px-4 h-full overflow-auto dark:text-darkmode-text-primary">
			<div className="flex items-center mb-3">
				<button 
					onClick={onBack} 
					className="mr-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-darkmode-border transition-colors"
				>
					<svg className="w-5 h-5 text-gray-700 dark:text-darkmode-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
					</svg>
				</button>
				<h1 className="text-base font-bold text-gray-900 dark:text-darkmode-text-primary">
					回答生成
				</h1>
			</div>
			
			<form onSubmit={handleGenerate}>
				<div className="mb-4">
					<label className="block text-sm font-medium mb-1 dark:text-darkmode-text-primary">
						会社名
					</label>
					<div className="relative">
						<div className="flex">
							<div className="relative flex-1">
								<input
									type="text"
									value={searchQuery}
									onChange={handleCompanyInputChange}
									onKeyDown={handleSearchKeyDown}
									onFocus={() => setIsCompanyMenuOpen(true)}
									placeholder="会社名を入力してください"
									required
									className="w-full px-3 py-2 text-sm bg-white dark:bg-darkmode-paper border border-gray-300 dark:border-darkmode-border rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary-main dark:focus:ring-primary-light focus:border-primary-main dark:focus:border-primary-light transition-colors dark:text-darkmode-text-primary"
								/>
								{isLoading && (
									<div className="absolute right-2 top-1/2 transform -translate-y-1/2">
										<div className="animate-spin h-4 w-4 border-2 border-primary-main dark:border-primary-light border-t-transparent rounded-full"></div>
									</div>
								)}
							</div>
							<button
								type="button"
								onClick={() => searchCompanies()}
								disabled={isLoading || searchQuery.trim().length < 2}
								className="px-3 py-2 bg-primary-main hover:bg-primary-dark text-white dark:bg-primary-light dark:hover:bg-primary-main dark:text-darkmode-text-primary rounded-r-md disabled:opacity-50 disabled:cursor-not-allowed"
							>
								<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
								</svg>
							</button>
						</div>
						
						{isCompanyMenuOpen && companies.length > 0 && (
							<div className="absolute z-10 w-full mt-1 bg-white dark:bg-darkmode-paper border border-gray-200 dark:border-darkmode-border rounded-md shadow-lg max-h-48 overflow-y-auto">
								{companies.map((company) => (
									<div
										key={company.corporate_number}
										onClick={() => handleCompanySelect(company)}
										className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-darkmode-border cursor-pointer text-sm"
									>
										<div className="font-medium">{company.name}</div>
										<div className="text-xs text-gray-500 dark:text-darkmode-text-secondary">{company.corporate_number}</div>
									</div>
								))}
							</div>
						)}
						
						{error && (
							<p className="text-xs text-red-500 mt-1">{error}</p>
						)}
					</div>
					<p className="text-xs text-gray-500 dark:text-darkmode-text-secondary mt-1">
						会社名を入力してください
					</p>
				</div>

				<div className="mb-4">
					<label className="block text-sm font-medium mb-1 dark:text-darkmode-text-primary">
						生成モデル
					</label>
					<div className="relative">
						<button
							type="button"
							onClick={() => setIsModelMenuOpen(!isModelMenuOpen)}
							className="w-full px-3 py-2 text-sm bg-white dark:bg-darkmode-paper border border-gray-300 dark:border-darkmode-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-main dark:focus:ring-primary-light focus:border-primary-main transition-colors dark:text-darkmode-text-primary text-left flex justify-between items-center"
						>
							<div>
								<div className="font-medium">{getModelDisplayName(selectedModel)}</div>
								<div className="text-xs text-gray-500 dark:text-darkmode-text-secondary">{getModelDescription(selectedModel)}</div>
							</div>
							<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
							</svg>
						</button>
						
						{isModelMenuOpen && (
							<div className="absolute z-10 w-full mt-1 bg-white dark:bg-darkmode-paper border border-gray-200 dark:border-darkmode-border rounded-md shadow-lg">
								{["gemini-2.0-flash", "gemini-2.0-flash-lite", "gemini-2.0-flash-thinking-exp"].map((model) => (
									<div
										key={model}
										onClick={() => handleModelChange(model as LLMModel)}
										className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-darkmode-border cursor-pointer"
									>
										<div className="font-medium text-sm">{getModelDisplayName(model as LLMModel)}</div>
										<div className="text-xs text-gray-500 dark:text-darkmode-text-secondary">{getModelDescription(model as LLMModel)}</div>
									</div>
								))}
							</div>
						)}
					</div>
				</div>

				<div className="mt-6">
					<button
						type="submit"
						disabled={!selectedCompany || isSubmitting}
						className="w-full bg-primary-main hover:bg-primary-dark text-white dark:bg-primary-light dark:hover:bg-primary-main dark:text-darkmode-text-primary py-2 px-4 rounded-md font-semibold transition-colors duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{isSubmitting ? (
							<>
								<svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white dark:text-darkmode-text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
									<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
									<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
								</svg>
								処理中...
							</>
						) : (
							"回答を生成する"
						)}
					</button>

					{generateSuccess && (
						<div className="mt-2 text-center text-green-600 dark:text-green-400 text-sm">
							回答が生成されました！
						</div>
					)}
				</div>
			</form>
		</div>
	);
}; 