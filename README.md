# TypeScript Learning Web App with Monaco Editor

Vue.js 3 + TypeScript + Monaco Editor で構築された、20日間のTypeScript学習プログラムを管理するインタラクティブなWebアプリケーションです。

## 🌐 デモ

**GitHub Pages で公開中**: https://bon71.github.io/typescript-learning-web-app/

## 🎯 主な機能

### 💻 インタラクティブコードエディタ
- **Monaco Editor統合**: VS Code同等のTypeScript開発環境
- **リアルタイム型チェック**: コード入力中の型エラー検出
- **インテリセンス**: 自動補完・型情報表示
- **コード実行機能**: ブラウザ上でTypeScriptコードの実行
- **エラー表示**: わかりやすいエラーメッセージとデバッグ支援

### 📚 学習プログラム管理
- **20日間の体系的カリキュラム**: JavaScript復習 → TypeScript入門 → 実践応用
- **進捗管理**: 完了状況の可視化・学習継続日数の記録
- **フェーズ別学習**: 段階的なスキル習得
- **サンプルコード**: 各日程で豊富な実例を提供

### 🎨 優れたUX/UI
- **レスポンシブデザイン**: PC・タブレット・スマホ完全対応
- **ダークテーマ対応**: エディタテーマの切り替え
- **アニメーション**: スムーズなUIトランジション
- **アクセシビリティ**: キーボード操作・スクリーンリーダー対応

## 🚀 新機能（v2.0.0）

### ✨ Monaco Editor統合
- VS Code同等のコード編集体験
- TypeScript Language Service内蔵
- シンタックスハイライト・コード補完
- リアルタイム型チェック・エラー検出
- コードフォーマット機能

### 🔧 コード実行環境
- ブラウザ内でのTypeScript実行
- console.log出力の表示
- エラーハンドリング・デバッグ支援
- 実行時間測定

### 🎯 学習支援機能
- **二つのモード切り替え**: 静的サンプル表示 ⟷ インタラクティブエディタ
- **コードリセット機能**: 元のサンプルコードに戻す
- **リアルタイムフィードバック**: コード変更時の即座な反応

## 🛠️ セットアップ手順

### 1. リポジトリのクローン
```bash
git clone https://github.com/bon71/typescript-learning-web-app.git
cd typescript-learning-web-app
```

### 2. 依存関係のインストール
```bash
npm install
```

### 3. 開発サーバーの起動
```bash
npm run dev
```
→ http://localhost:3000 でアクセス

### 4. 本番ビルド
```bash
npm run build
```

## 🎨 Monaco Editor活用法

### 💻 エディタモードの使用
1. **学習項目を展開** → Day 1-7の任意の項目をクリック
2. **エディタモード切り替え** → 「エディタモード」ボタンをクリック
3. **コード編集** → Monaco Editorで自由にコードを編集
4. **実行** → 「▶️ 実行」ボタンでコードを実行
5. **リセット** → 「🔄 リセット」でサンプルコードに戻す

### ✨ エディタ機能
- **自動補完**: Ctrl + Space でコード補完
- **フォーマット**: Shift + Alt + F でコード整形
- **エラー確認**: 赤い波線でエラー箇所を表示
- **型情報**: ホバーで変数・関数の型情報を表示

## 🔧 技術スタック

### 🏗️ フロントエンド
- **Vue.js 3.4+**: Composition API + `<script setup>`
- **TypeScript 5.3+**: 完全な型安全性
- **Monaco Editor 0.44+**: VS Code同等のエディタ体験
- **Vite 5.0+**: 高速ビルド・開発サーバー

### 🚀 デプロイ・CI/CD
- **GitHub Pages**: 静的サイトホスティング
- **GitHub Actions**: 自動ビルド・デプロイ
- **Vite最適化**: Monaco Editorチャンク分割・パフォーマンス向上

## 📝 ライセンス

MIT License

## 📞 サポート

何か問題がございましたら、[Issues](https://github.com/bon71/typescript-learning-web-app/issues)でお知らせください。

---

**🎉 Monaco Editor統合により、VS Code同等のTypeScript学習環境を実現！**  
**本格的なインタラクティブ学習でTypeScriptマスターを目指しましょう！**