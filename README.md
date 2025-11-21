# Phocam Website

K-POPファンのためのマナーショットアプリ「Phocam」の公式ウェブサイトです。

## 技術スタック

- **Next.js 15** - React フレームワーク
- **TypeScript** - 型安全性
- **Tailwind CSS** - スタイリング
- **Framer Motion** - アニメーション
- **Lenis** - スムーズスクロール
- **next-intl** - 国際化 (日本語/English/한국어)

## 開発

```bash
# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev

# ビルド
npm run build

# 本番環境で実行
npm start
```

## プロジェクト構造

```
phocam-site/
├── app/
│   ├── [locale]/          # 国際化対応のページ
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── globals.css
│   └── layout.tsx
├── components/            # Reactコンポーネント
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── HeroSection.tsx
│   ├── FeaturesSection.tsx
│   ├── ScreenshotsSection.tsx
│   ├── DownloadSection.tsx
│   └── SmoothScroll.tsx
├── messages/             # 翻訳ファイル
│   ├── ja.json          # 日本語
│   ├── en.json          # 英語
│   └── ko.json          # 韓国語
├── public/
│   └── images/          # 画像ファイル（スクリーンショットなど）
└── i18n.ts              # 国際化設定
```

## カスタマイズ

### スクリーンショットの追加

1. アプリのスクリーンショットを `public/images/` に配置
2. `components/ScreenshotsSection.tsx` のコメントアウトを解除
3. 画像ファイル名を適切に設定

### ダウンロードリンクの設定

`components/DownloadSection.tsx` の以下の部分を編集:

```tsx
<a href="#" ...>  // ここにTestFlightのリンクを追加
<a href="#" ...>  // ここにAPKダウンロードリンクを追加
```

### 翻訳の編集

`messages/` フォルダ内の各言語ファイル（ja.json, en.json, ko.json）を編集してコンテンツを変更できます。

## デプロイ

このプロジェクトは静的サイト生成（SSG）を使用しているため、様々なプラットフォームにデプロイできます。

### Vercel（推奨）

```bash
# Vercel CLIをインストール
npm i -g vercel

# デプロイ
vercel
```

### Cloudflare Pages

Cloudflare Pagesへのデプロイは以下の手順で行います:

1. **Cloudflare Dashboardでプロジェクトを作成**
   - GitHubリポジトリを接続

2. **ビルド設定**
   ```
   ビルドコマンド: npm run build
   ビルド出力ディレクトリ: .next
   Node.js バージョン: 20.x以上
   ```

3. **環境変数（必要に応じて）**
   - 必要な環境変数があれば設定

**注意**: 現在、Next.js 16は`@cloudflare/next-on-pages`の正式サポート外です。サポートが追加されるまでは、Vercelなど他のプラットフォームの使用を推奨します。

### Netlify

```bash
# Netlify CLIをインストール
npm i -g netlify-cli

# デプロイ
netlify deploy --prod
```

### その他のプラットフォーム

Next.js 16は以下のプラットフォームでもデプロイ可能です:
- AWS Amplify
- Google Cloud Run
- Azure Static Web Apps
- その他のNode.jsホスティング

## ライセンス

ISC
