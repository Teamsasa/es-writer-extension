import { useAuth } from "@clerk/chrome-extension";
import { useCallback } from "react";

interface GeneratedAnswers {
	[key: string]: string;
}

const api_endpoint = process.env.PLASMO_PUBLIC_API_ENDPOINT;

export function useGenAnswer() {
	const { getToken } = useAuth();

	const genAnswer = useCallback(async () => {
		const token = await getToken();
		console.log("Generating answers...");

		return new Promise<void>((resolve, reject) => {
			chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
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
										`${api_endpoint}/app/generate/generateAnswers`,
										{
											method: "POST",
											headers: {
												"Content-Type": "application/json",
												Authorization: `Bearer ${token}`,
												IdpHeader: process.env.PLASMO_PUBLIC_IDP_HEADER,
											},
											body: JSON.stringify({ html: html_source }),
										},
									);
									if (!apiResponse.ok) {
										console.error(
											"Network response was not ok",
											apiResponse.statusText,
										);
										reject(new Error("Network response was not ok"));
										return;
									}
									const answers = await apiResponse.json();
									console.log("Received answers:", answers);
									replaceTextareaText(answers);
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
			});
		});
	}, [getToken]);

	return genAnswer;
}

function replaceTextareaText(answers: GeneratedAnswers) {
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		if (tabs[0] && tabs[0].id !== undefined) {
			chrome.tabs.sendMessage(tabs[0].id, {
				action: "replaceTextareas",
				answers: answers,
			});
		}
	});
}
