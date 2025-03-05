import { useAuth } from "@clerk/chrome-extension";
import { useCallback } from "react";

type LLMModel =
	| "gemini-2.0-flash"
	| "gemini-2.0-flash-lite"
	| "gemini-2.0-flash-thinking-exp";

interface GenerateRequest {
	company: string;
	model: LLMModel;
	html: string;
}

interface GenerateResponse {
	answers: Array<{
		question: string;
		answer: string;
	}>;
}

interface ErrorResponse {
	error: string;
}

interface GenAnswerParams {
	company: string;
	model: LLMModel;
}

const API_ENDPOINT = process.env.PLASMO_PUBLIC_API_ENDPOINT;

export function useGenAnswer() {
	const { getToken } = useAuth();

	const genAnswer = useCallback(
		async ({ company, model }: GenAnswerParams) => {
			const token = await getToken();
			console.log("Generating answers...");

			return new Promise<void>((resolve, reject) => {
				chrome.tabs.query(
					{ active: true, currentWindow: true },
					async (tabs) => {
						if (tabs[0] && tabs[0].id !== undefined) {
							chrome.tabs.sendMessage(
								tabs[0].id,
								{ action: "getHTML" },
								async (response) => {
									if (response?.html) {
										const html_source = response.html;
										console.log("html loaded");
										try {
											const apiResponse = await fetch(
												`${API_ENDPOINT}/api/generate`,
												{
													method: "POST",
													headers: {
														"Content-Type": "application/json",
														Authorization: `Bearer ${token}`,
														IdpHeader: process.env.PLASMO_PUBLIC_IDP_HEADER,
													},
													body: JSON.stringify({
														company,
														model,
														html: html_source,
													}),
												},
											);
											if (!apiResponse.ok) {
												const errorData =
													(await apiResponse.json()) as ErrorResponse;
												switch (apiResponse.status) {
													case 401:
														throw new Error(
															"認証エラーが発生しました。再度ログインしてください。",
														);
													case 404:
														throw new Error("リソースが見つかりませんでした。");
													case 500:
														throw new Error(
															"サーバーエラーが発生しました。しばらく時間をおいて再度お試しください。",
														);
													default:
														throw new Error(
															`エラーが発生しました: ${errorData.error}`,
														);
												}
											}
											const response =
												(await apiResponse.json()) as GenerateResponse;
											console.log("Received answers:", response.answers);
											replaceTextareaText(response.answers);
											resolve();
										} catch (error) {
											console.error("Fetch error:", error);
											reject(error);
										}
									} else {
										console.error("Failed to get active tab HTML.");
										reject(new Error("Failed to get active tab HTML."));
									}
								},
							);
						} else {
							console.error("No active tab found or tab ID is undefined.");
							reject(new Error("No active tab found or tab ID is undefined."));
						}
					},
				);
			});
		},
		[getToken],
	);

	return genAnswer;
}

function replaceTextareaText(answers: GenerateResponse["answers"]) {
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		if (tabs[0] && tabs[0].id !== undefined) {
			chrome.tabs.sendMessage(tabs[0].id, {
				action: "replaceTextareas",
				answers: answers,
			});
		}
	});
}
