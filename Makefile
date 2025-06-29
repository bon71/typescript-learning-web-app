.PHONY: help dev stop clean install logs shell monaco format lint

# デフォルトターゲット（ヘルプ表示）
help:
	@echo "🚀 TypeScript学習サイト開発コマンド"
	@echo ""
	@echo "開発環境:"
	@echo "  dev      - 開発環境を起動"
	@echo "  stop     - 開発環境を停止"
	@echo "  clean    - 環境をクリーンアップ"
	@echo ""
	@echo "依存関係:"
	@echo "  install  - 依存関係をインストール"
	@echo "  monaco   - Monaco Editorを追加"
	@echo ""
	@echo "開発支援:"
	@echo "  logs     - ログを表示"
	@echo "  shell    - コンテナ内でシェル起動"
	@echo "  format   - コードフォーマット"
	@echo "  lint     - コードリント"

# 開発環境の起動
dev:
	@echo "🚀 開発環境を起動しています..."
	docker-compose up --build

# 開発環境の停止
stop:
	@echo "⏹️ 開発環境を停止しています..."
	docker-compose down

# 環境のクリーンアップ
clean:
	@echo "🧹 環境をクリーンアップしています..."
	docker-compose down -v
	docker system prune -f

# 依存関係のインストール
install:
	@echo "📦 依存関係をインストールしています..."
	docker-compose run --rm typescript-learning npm install

# ログの表示
logs:
	@echo "📋 ログを表示しています..."
	docker-compose logs -f

# コンテナ内でシェルを開く
shell:
	@echo "🐚 コンテナ内でシェルを起動しています..."
	docker-compose exec typescript-learning sh

# Monaco Editorの追加
monaco:
	@echo "🎨 Monaco Editorを追加しています..."
	docker-compose run --rm typescript-learning npm install monaco-editor @types/monaco-editor
	@echo "✅ Monaco Editor追加完了!"

# コードフォーマット
format:
	@echo "✨ コードをフォーマットしています..."
	docker-compose exec typescript-learning npm run format

# コードリント
lint:
	@echo "🔍 コードをリントしています..."
	docker-compose exec typescript-learning npm run lint
