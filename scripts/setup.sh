#!/bin/bash

echo "🎯 TypeScript学習サイト - 初期セットアップ"
echo "=============================================="

# 1. Dockerの確認
if ! command -v docker &> /dev/null; then
    echo "❌ Dockerがインストールされていません"
    echo "   https://docs.docker.com/get-docker/ からインストールしてください"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Composeがインストールされていません"
    echo "   https://docs.docker.com/compose/install/ からインストールしてください"
    exit 1
fi

echo "✅ Docker環境を確認しました"

# 2. 環境の起動
echo ""
echo "🚀 開発環境を起動しています..."
docker-compose up --build -d

# 3. 依存関係のインストール
echo ""
echo "📦 依存関係をインストールしています..."
docker-compose exec typescript-learning npm install

# 4. Monaco Editorの追加
echo ""
echo "🎨 Monaco Editorを追加しています..."
docker-compose exec typescript-learning npm install monaco-editor @types/monaco-editor

# 5. 完了メッセージ
echo ""
echo "✅ セットアップ完了!"
echo ""
echo "🌐 ブラウザで http://localhost:3000 にアクセスしてください"
echo ""
echo "📝 便利なコマンド:"
echo "   make dev    - 開発サーバー起動"
echo "   make stop   - 開発サーバー停止"
echo "   make shell  - コンテナ内シェル"
echo "   make logs   - ログ表示"
