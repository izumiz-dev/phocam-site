# Phocam Website - 開発ガイド

このドキュメントはClaude Codeなどの開発アシスタントAI、および開発者向けのプロジェクトガイドです。

## プロジェクト概要

K-POPファンのためのマナーショットアプリ「Phocam」の公式ウェブサイト

- **フレームワーク**: Next.js 16 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS 4.x
- **アニメーション**: Framer Motion
- **国際化**: next-intl (日本語/English/한국어)
- **スムーズスクロール**: Lenis

## セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build

# Lint
npm run lint
```

## プロジェクト構造

```
phocam-site/
├── app/                    # Next.js App Router
│   ├── [locale]/          # 国際化対応ページ
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── globals.css        # グローバルスタイル
│   └── layout.tsx         # ルートレイアウト
├── components/            # Reactコンポーネント
│   ├── Header.tsx         # ヘッダーナビゲーション
│   ├── Footer.tsx         # フッター
│   ├── HeroSection.tsx    # ヒーローセクション
│   ├── FeaturesSection.tsx # 機能紹介
│   ├── ScreenshotsSection.tsx # スクリーンショット
│   ├── DownloadSection.tsx # ダウンロードCTA
│   └── SmoothScroll.tsx   # スムーズスクロールProvider
├── messages/              # 国際化翻訳ファイル
│   ├── ja.json           # 日本語
│   ├── en.json           # 英語
│   └── ko.json           # 韓国語
├── public/
│   └── images/           # 画像アセット
└── i18n.ts               # 国際化設定
```

## 開発ワークフロー

### ブランチ戦略

- `main`: プロダクション環境
- `claude/*`: Claude Codeによる開発ブランチ
- その他のフィーチャーブランチ: 機能開発用

### コミット前の確認事項

1. **Lint通過**: `npm run lint`
2. **ビルド成功**: `npm run build`
3. **TypeScript型チェック**: ビルド時に自動実行

### Pull Request作成時

- CI/CDが自動実行されます
- すべてのチェックが通過することを確認してください

## コーディング規約

### TypeScript

- 明示的な型定義を使用
- `any`型の使用は避ける
- インターフェースよりも`type`を優先（既存コードに合わせる）

### React/Next.js

- 関数コンポーネントを使用
- Server Componentsをデフォルトとし、必要な場合のみClient Componentsを使用（`'use client'`）
- ファイル名はPascalCase（例: `HeroSection.tsx`）

### CSS/Tailwind

- Tailwind CSSのユーティリティクラスを使用
- カスタムCSSは最小限に
- レスポンシブデザインは`md:`、`lg:`などのプレフィックスを使用

### 国際化

- ハードコードされたテキストは避ける
- すべてのユーザー向けテキストは`messages/`の翻訳ファイルに配置
- `useTranslations`フックを使用してテキストを取得

## CI/CD

### GitHub Actions

プロジェクトには以下のワークフローが設定されています：

#### Build & Lint Workflow

- **トリガー**: Pull Request、mainブランチへのpush
- **チェック項目**:
  - 依存関係のインストール
  - ESLintによるコードチェック
  - Next.jsビルドの成功確認

ワークフローファイル: `.github/workflows/build-lint.yml`

### ローカルでのCI/CD確認

```bash
# Lintチェック
npm run lint

# ビルドチェック
npm run build
```

## デプロイ

### Cloudflare Pages

- ビルドコマンド: `npm run build`
- ビルド出力ディレクトリ: `.next`
- Node.js バージョン: 20.x以上

### その他のプラットフォーム

- Vercel（推奨）
- Netlify
- AWS Amplify
- その他のNode.jsホスティング

## トラブルシューティング

### ビルドエラー

1. `npm install`で依存関係を再インストール
2. `node_modules`と`.next`ディレクトリを削除して再ビルド

### Lintエラー

```bash
# 自動修正を試みる（ESLint 9では未サポート）
npm run lint

# 個別に修正が必要な場合、エディタのESLint拡張機能を使用
```

### 型エラー

- TypeScriptの型定義を確認
- `@types/*`パッケージが最新であることを確認

## Claude Codeへの指示

### 新機能開発時

1. 該当するコンポーネントファイルを確認
2. TypeScriptの型安全性を維持
3. 既存のコーディングスタイルに従う
4. 変更後は必ず`npm run lint`と`npm run build`を実行

### 翻訳追加時

1. `messages/ja.json`にキーを追加
2. 同じキーを`messages/en.json`と`messages/ko.json`にも追加
3. 各言語で適切な翻訳を提供

### スタイル変更時

- Tailwind CSSのユーティリティクラスを使用
- カスタムスタイルが必要な場合は`globals.css`またはコンポーネント内で定義

## 参考リンク

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [Framer Motion Documentation](https://www.framer.com/motion/)
