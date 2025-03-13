export type LLMModel =
	| "gemini-2.0-flash"
	| "gemini-2.0-flash-lite"
	| "gemini-2.0-flash-thinking-exp";

export interface GenerateParams {
	companyName: string;
	companyId: string;
	model: LLMModel;
}

export interface Company {
	corporate_number: string;
	name: string;
}
