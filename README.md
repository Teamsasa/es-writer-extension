# Es writer extension

エントリーシート自動生成を支援する Chrome 拡張機能です。

## 🚀 ストアページ

[Chrome ウェブストア](https://chromewebstore.google.com/detail/es-writer-extension/jkencchebhkbaomammmgbhnpalgkchkm)で公開中です。

## ✨ 機能

*   プロフィール情報の登録・編集
*   企業情報を自動で検索
*   設問を自動で読み取り回答を生成
*   生成された回答の自動入力
*   テーマ（ライト/ダーク）の切り替え

## 🚀 インストール (開発者向け)

1.  **リポジトリをクローン:**
    ```bash
    git clone https://github.com/Teamsasa/es-writer-extension.git
    cd es-writer-extension
    ```
2.  **依存関係をインストール:**
    ```bash
    pnpm install
    ```
3.  **環境変数を設定:**
    `.env.example` ファイルを参考にして `.env` ファイルを作成し、必要な環境変数を設定します。
4.  **拡張機能をビルド:**
    ```bash
    pnpm build
    ```
    これにより `build/chrome-mv3-prod` ディレクトリにビルド成果物が出力されます。
5.  **Chrome に拡張機能を読み込む:**
    *   Chrome で `chrome://extensions` を開きます。
    *   右上の「デベロッパー モード」をオンにします。
    *   「パッケージ化されていない拡張機能を読み込む」をクリックし、上記で作成された `build/chrome-mv3-prod` ディレクトリを選択します。

## 使い方

1.  Chrome ツールバーの拡張機能アイコンをクリックしてポップアップを開きます。
2.  「プロフィール」タブで、学歴、職歴、自己PRなどの情報を入力・保存します。
3.  「生成」タブで、対象企業を検索し、エントリーシートの設問を入力します。
4.  「生成」ボタンをクリックすると、AIがプロフィールと企業情報に基づいて回答案を作成します。
5.  生成された回答を確認し、必要に応じて編集します。

## 🛠️ 開発

*   **開発モードで起動:**
    ```bash
    pnpm dev
    ```
*   **コードチェック:**
    ```bash
    pnpm check
    ```
*   **主要技術スタック:**
    *   React
    *   TypeScript
    *   Tailwind CSS
    *   Plasmo
    *   Clerk (認証)
    *   Biome (フォーマッター/リンター)
