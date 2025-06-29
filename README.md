# TypeScript学習サイト - Docker開発環境

## 🚀 クイックスタート

### 前提条件
- Docker Desktop
- Git

### 環境構築（5分）
```bash
# 1. リポジトリクローン
git clone <repository-url>
cd typescript-learning-web-app

# 2. 初期セットアップ
chmod +x scripts/setup.sh
./scripts/setup.sh

# 3. ブラウザでアクセス
# http://localhost:3000
```

## 📋 コマンド一覧

### Makefileが使える環境（Mac/Linux）
```bash
make dev      # 開発環境起動
make stop     # 開発環境停止
make shell    # コンテナ内シェル
make logs     # ログ表示
make monaco   # Monaco Editor追加
```

### Windows環境（npm scripts使用）
```bash
npm run docker:dev      # 開発環境起動
npm run docker:stop     # 開発環境停止
npm run docker:shell    # コンテナ内シェル
npm run docker:logs     # ログ表示
npm run docker:monaco   # Monaco Editor追加
```

### 直接docker-composeコマンド使用
```bash
docker-compose up --build                    # 開発環境起動
docker-compose down                          # 開発環境停止
docker-compose exec typescript-learning sh   # コンテナ内シェル
docker-compose logs -f                       # ログ表示
```

## 🔧 開発ワークフロー

### 日常の開発
1. `make dev` で環境起動
2. コード編集（ホットリロード対応）
3. ブラウザで確認
4. `make stop` で環境停止

### Monaco Editor統合
1. `make monaco` でライブラリ追加
2. `src/components/MonacoCodeEditor.vue` 作成
3. 既存コンポーネントに統合

## 🚨 トラブルシューティング

### ポート競合
```bash
# docker-compose.ymlのポート変更
ports:
  - "3001:3000"  # 3001番ポート使用
```

### 権限エラー（Linux）
```bash
sudo docker-compose up --build
```

### Makeが使えない場合
npm scriptsまたは直接docker-composeコマンドを使用
