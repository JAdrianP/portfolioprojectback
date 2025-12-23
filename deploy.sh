#!/bin/bash
set -e  # Sale si algún comando falla

# -----------------------------
# VARIABLES
# -----------------------------
REPO_DIR=/home/infrastructure/backend/backend
COMPOSE_FILE=/home/infrastructure/backend/backend/docker-compose.yml
BACKEND_SERVICE_NAME=backend_backend_1
MYSQL_SERVICE_NAME=backend_mysql-db_1

echo "📦 1. Entrando al repositorio"
cd $REPO_DIR

echo "🔄 2. Haciendo git pull..."
git pull

echo "🛑 3. Parando y eliminando contenedores antiguos del backend"
# Solo backend, no tocamos MySQL ni frontend
if [ "$(docker ps -a -q -f name=$BACKEND_SERVICE_NAME)" ]; then
    docker stop $BACKEND_SERVICE_NAME 2>/dev/null || true
    docker rm $BACKEND_SERVICE_NAME 2>/dev/null || true
fi

echo "🧹 4. Limpiando contenedores huérfanos"
docker container prune -f

echo "🔧 5. Reconstruyendo y levantando servicios"
docker-compose -f $COMPOSE_FILE up -d --build --force-recreate

echo "✅ Despliegue backend completo"