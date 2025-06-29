FROM node:18-alpine

# 作業ディレクトリの設定
WORKDIR /app

# システムの更新とgitのインストール
RUN apk update && apk add --no-cache git

# パッケージファイルをコピー（キャッシュ効率化）
COPY package*.json ./

# 依存関係のインストール
RUN npm ci

# ポート3000を公開
EXPOSE 3000

# 開発サーバーの起動（ホストマウント用）
CMD ["npm", "run", "dev"]
