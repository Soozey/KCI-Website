#!/bin/bash

cd /root/KCI-Website

echo "📥 Pull code..."
git pull origin main

echo "🐳 Rebuild Docker..."
docker compose down
docker compose up -d --build

echo "✅ Deploy terminé"
