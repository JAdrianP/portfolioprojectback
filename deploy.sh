#!/bin/bash

# VARIABLES
REPO_DIR=/home/infrastructure/backend/backend

echo "📦 1. Entrando al repositorio"
cd $REPO_DIR

echo "🔄 2. Haciendo git pull..."
git pull

echo "🔧 3. Levantando servicios con docker-compose..."
docker-compose up -d --build

echo "✅ Despliegue backend completo."
