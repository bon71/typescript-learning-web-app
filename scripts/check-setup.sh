#!/bin/bash

echo "🔍 TypeScript学習サイト - 環境チェック"
echo "====================================="

# Docker確認
if command -v docker &> /dev/null; then
    echo "✅ Docker: $(docker --version)"
else
    echo "❌ Docker: インストールされていません"
    echo "   → https://docs.docker.com/get-docker/"
    exit 1
fi

# Docker Compose確認
if command -v docker-compose &> /dev/null; then
    echo "✅ Docker Compose: $(docker-compose --version)"
else
    echo "❌ Docker Compose: インストールされていません"
    echo "   → https://docs.docker.com/compose/install/"
    exit 1
fi

# Make確認（オプション）
if command -v make &> /dev/null; then
    echo "✅ Make: $(make --version | head -n1)"
    echo "   → Makefileコマンドが使用できます"
else
    echo "⚠️  Make: インストールされていません"
    echo "   → npm scriptsまたは直接docker-composeコマンドを使用"
fi

# ポート確認
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  ポート3000: 既に使用中"
    echo "   → docker-compose.ymlでポート番号を変更してください"
else
    echo "✅ ポート3000: 利用可能"
fi

echo ""
echo "🎯 推奨開始コマンド:"
if command -v make &> /dev/null; then
    echo "   make dev"
else
    echo "   npm run docker:dev"
    echo "   または docker-compose up --build"
fi

echo ""
echo "📖 詳細: README.md を参照"
