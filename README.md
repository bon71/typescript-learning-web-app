# TypeScript Learning Web App

Vue.js 3 + TypeScriptで構築された、20日間のTypeScript学習プログラムを管理するWebアプリケーションです。

## 📁 ファイル構成

```
typescript-learning-web-app/
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── index.html
├── README.md
└── src/
    ├── main.ts
    ├── App.vue
    ├── style.css
    ├── vite-env.d.ts
    ├── types/
    │   └── learning.ts
    ├── data/
    │   └── learningData.ts
    ├── composables/
    │   └── useLearningProgress.ts
    └── components/
        ├── LearningCard.vue
        ├── ProgressHeader.vue
        ├── PhaseTabs.vue
        └── StatsFooter.vue
```

## 🚀 セットアップ手順

1. **リポジトリのクローン**
   ```bash
   git clone https://github.com/bon71/typescript-learning-web-app.git
   cd typescript-learning-web-app
   ```

2. **依存関係のインストール**
   ```bash
   npm install
   ```

3. **開発サーバーの起動**
   ```bash
   npm run dev
   ```

4. **本番ビルド（必要に応じて）**
   ```bash
   npm run build
   ```

## ✨ 主な特徴

### 🔧 技術スタック
- **Vue.js 3**: 最新のComposition API + `<script setup>`構文
- **TypeScript**: 完全な型安全性
- **Vite**: 高速なビルドツール
- **リアクティブ設計**: Vue.jsの強力なリアクティビティ

### 🏗️ アーキテクチャ
- **Composables**: `useLearningProgress`で状態管理を分離
- **型定義**: `learning.ts`で型安全性を確保
- **コンポーネント分割**: 再利用可能なコンポーネント設計
- **データ分離**: 学習データとUI Logic分離

### 🎯 Vue.js固有の機能
- **Reactive State**: `ref`, `computed`でリアクティブな状態管理
- **Watchers**: ローカルストレージへの自動保存
- **Transitions**: フェーズ切り替え時のスムーズなアニメーション
- **Event Emitting**: 親子コンポーネント間の型安全な通信
- **Scoped Slots**: コンポーネントの再利用性向上

### 🔒 TypeScript の活用
- **Interface定義**: `LearningDay`, `ProgressStats`等
- **Props/Emits型定義**: コンポーネント間の型安全性
- **Composable型定義**: カスタムフックの完全な型サポート
- **Computed型推論**: 計算プロパティの自動型推論

## 🎨 コンポーネント設計

### `LearningCard.vue`
- 各日の学習内容表示
- 完了状態の管理
- フェーズ別スタイリング

### `ProgressHeader.vue`
- 全体進捗の表示
- プログレスバー
- 統計情報

### `PhaseTabs.vue`
- フェーズ切り替えタブ
- アクティブ状態管理

### `StatsFooter.vue`
- 詳細統計
- リセット機能

## 📚 学習プログラム

### Phase 1: JavaScript復習（Day 1-7）
JavaScriptの基礎を固める7日間のプログラム
- 変数宣言と基本型
- 条件分岐と比較演算子
- 配列とループ
- 関数の定義と使い方
- オブジェクトの基本
- DOM操作とイベント
- 総復習とミニアプリ

### Phase 2: TypeScript入門（Day 8-14）
TypeScriptの基礎を学ぶ7日間のプログラム
- TypeScriptとは
- 基本の型
- 配列とオブジェクトの型
- 関数に型をつける
- Union型とLiteral型
- Interfaceと継承
- クラスとTypeScript

### Phase 3: TypeScript実践応用（Day 15-20）
実践的なTypeScriptスキルを身につける6日間のプログラム
- Generics
- 型ガード
- Promiseと非同期処理
- Utility Types
- API設計
- 総仕上げミニプロジェクト

## 🎯 機能

### 進捗管理
- ✅ 各日の学習完了チェック
- 📊 全体進捗率とフェーズ別進捗の表示
- 💾 ローカルストレージで永続化
- 🔥 学習継続日数の記録

### ユーザビリティ
- 📱 レスポンシブデザイン（PC、タブレット、スマホ対応）
- ✨ 直感的なUI/UX
- 🎨 フェーズ別カラーテーマ
- ⌨️ キーボードショートカット（Ctrl + 1-3でフェーズ切り替え）

### インタラクション
- 🎭 カードのホバーエフェクト
- 📈 プログレスバーのアニメーション
- ✅ 完了時の視覚的フィードバック
- 🔄 スムーズなフェーズ切り替えアニメーション

## 🛠️ 開発環境

- Node.js 18+
- npm または yarn
- モダンブラウザ（Chrome, Firefox, Safari, Edge）

## 📝 ライセンス

MIT License

## 🤝 コントリビューション

プルリクエストやイシューの報告を歓迎します！

## 📞 サポート

何か問題がございましたら、[Issues](https://github.com/bon71/typescript-learning-web-app/issues)でお知らせください。

---

**Vue.js + TypeScriptで構築された、型安全でモダンな学習アプリケーションです！🎉**