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

# -----------------------------
# Función para parar y eliminar contenedor si existe
# -----------------------------
stop_and_rm() {
    local container_name=$1
    if [ "$(docker ps -a -q -f name=$container_name)" ]; then
        echo "🛑 Parando y eliminando contenedor $container_name..."
        docker stop $container_name 2>/dev/null || true
        docker rm $container_name 2>/dev/null || true
    fi
}

echo "🛑 3. Limpiando contenedores antiguos del backend y MySQL (si están detenidos)"
stop_and_rm $BACKEND_SERVICE_NAME
stop_and_rm $MYSQL_SERVICE_NAME

echo "🧹 4. Limpiando contenedores e imagenes huérfanas"
docker container prune -f
docker image prune -a

echo "🔧 5. Reconstruyendo y levantando servicios"
docker-compose -f $COMPOSE_FILE up -d --build --force-recreate

echo "✅ Despliegue backend completo"