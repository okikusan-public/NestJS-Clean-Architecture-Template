#!/bin/sh
set -e

# マイグレーションの実行
npm run migration:run

# NestJSの起動
exec npm run start:dev
