import { createContext, useContext, useEffect, useMemo, useState } from "react";

// カラーモードの型定義
type ColorMode = "light" | "dark" | "system";

// カラーモードコンテキストの型定義
interface ColorModeContextType {
	mode: ColorMode;
	setMode: (mode: ColorMode) => void;
	systemPreference: "light" | "dark";
}

// カラーモードコンテキストの作成
const ColorModeContext = createContext<ColorModeContextType>({
	mode: "system",
	setMode: () => {},
	systemPreference: "light",
});

// カラーモードコンテキストのフック
export const useColorMode = () => useContext(ColorModeContext);

// Chromeのストレージからモードをロードする関数
const loadThemePreference = async (): Promise<ColorMode> => {
	return new Promise((resolve) => {
		chrome.storage.sync.get("themeMode", (result) => {
			resolve((result.themeMode as ColorMode) || "system");
		});
	});
};

// Chromeのストレージにモードをセーブする関数
const saveThemePreference = async (mode: ColorMode) => {
	return chrome.storage.sync.set({ themeMode: mode });
};

// テーマプロバイダーコンポーネント
export const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
	// カラーモードの状態
	const [mode, setModeState] = useState<ColorMode>("system");
	// システムのダークモード設定状態
	const [systemPreference, setSystemPreference] = useState<"light" | "dark">(
		"light",
	);

	// マウント時にChromeのストレージからテーマ設定を読み込む
	useEffect(() => {
		loadThemePreference().then(setModeState);

		// システムのダークモード設定を検出
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		setSystemPreference(mediaQuery.matches ? "dark" : "light");

		// システムのダークモード設定変更を監視
		const handler = (e: MediaQueryListEvent) => {
			setSystemPreference(e.matches ? "dark" : "light");
		};

		mediaQuery.addEventListener("change", handler);
		return () => mediaQuery.removeEventListener("change", handler);
	}, []);

	// モード設定関数
	const setMode = (newMode: ColorMode) => {
		setModeState(newMode);
		saveThemePreference(newMode);
	};

	// 実際に適用するカラーモードを決定
	const actualMode = useMemo(() => {
		if (mode === "system") {
			return systemPreference;
		}
		return mode;
	}, [mode, systemPreference]);

	// HTML要素にdarkクラスを適用する効果
	useEffect(() => {
		if (actualMode === "dark") {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [actualMode]);

	// カラーモードコンテキストの値
	const colorModeContextValue = useMemo(
		() => ({
			mode,
			setMode,
			systemPreference,
		}),
		[mode, systemPreference],
	);

	return (
		<ColorModeContext.Provider value={colorModeContextValue}>
			{children}
		</ColorModeContext.Provider>
	);
};
