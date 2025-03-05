import { useState } from "react";

type LLMModel =
	| "gemini-2.0-flash"
	| "gemini-2.0-flash-lite"
	| "gemini-2.0-flash-thinking-exp";

interface GenerateModalProps {
	isOpen: boolean;
	onClose: () => void;
	onGenerate: (params: { company: string; model: LLMModel }) => Promise<void>;
}

export const GenerateModal = ({
	isOpen,
	onClose,
	onGenerate,
}: GenerateModalProps) => {
	const [company, setCompany] = useState("");
	const [selectedModel, setSelectedModel] =
		useState<LLMModel>("gemini-2.0-flash");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await onGenerate({ company, model: selectedModel });
		onClose();
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
			<div className="bg-white p-6 rounded-lg w-full max-w-md">
				<h2 className="text-xl font-bold mb-4">回答生成</h2>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label
							htmlFor="company"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							会社名
						</label>
						<input
							id="company"
							type="text"
							value={company}
							onChange={(e) => setCompany(e.target.value)}
							placeholder="例：株式会社DeNA"
							className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
							required
						/>
					</div>

					<div className="mb-6">
						<label
							htmlFor="model"
							className="block text-sm font-medium text-gray-700 mb-3"
						>
							生成モデル
						</label>
						<select
							id="model"
							value={selectedModel}
							onChange={(e) => setSelectedModel(e.target.value as LLMModel)}
							className="w-full px-4 py-3 border rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white"
						>
							<option value="gemini-2.0-flash">
								Gemini 2.0 Flash - バランスの取れた速度と性能を提供
							</option>
							<option value="gemini-2.0-flash-lite">
								Gemini 2.0 Flash Lite - 超高速処理に最適化された軽量版
							</option>
							<option value="gemini-2.0-flash-thinking-exp">
								Gemini 2.0 Flash Thinking - より深い考察と高品質な出力を重視
							</option>
						</select>
					</div>

					<div className="flex justify-end gap-3">
						<button
							type="button"
							onClick={onClose}
							className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
						>
							キャンセル
						</button>
						<button
							type="submit"
							className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
						>
							生成する
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
