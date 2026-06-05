#!/bin/bash

# Script para ejecutar el sistema completo (Backend + Frontend)

echo ""
echo "===================================="
echo " Sistema de Gestión de Proyectos"
echo "===================================="
echo ""

# Verificar si los directorios existen
if [ ! -d "backend" ]; then
    echo "Error: Directorio 'backend' no encontrado"
    exit 1
fi

if [ ! -d "frontend" ]; then
    echo "Error: Directorio 'frontend' no encontrado"
    exit 1
fi

echo "[1/4] Instalando dependencias del backend..."
cd backend
pip install -r requirements.txt -q
cd ..

echo "[2/4] Instalando dependencias del frontend..."
cd frontend
npm install -q
cd ..

echo "[3/4] Preparando base de datos..."
cd backend
python seed.py > /dev/null 2>&1
cd ..

echo "[4/4] Iniciando servidor backend en puerto 5000..."
cd backend
python run.py &
BACKEND_PID=$!
cd ..

sleep 2

echo ""
echo "Iniciando frontend en puerto 3000..."
cd frontend
npm start &
FRONTEND_PID=$!
cd ..

echo ""
echo "===================================="
echo " ✅ Sistema iniciado!"
echo "===================================="
echo ""
echo "Backend:  http://localhost:5000"
echo "Frontend: http://localhost:3000"
echo ""
echo "Credenciales de prueba:"
echo "   Admin:    admin@example.com / admin123"
echo "   Cliente:  cliente@example.com / cliente123"
echo ""
echo "Presiona Ctrl+C para detener..."

# Esperar a que ambos procesos terminen
wait $BACKEND_PID $FRONTEND_PID
