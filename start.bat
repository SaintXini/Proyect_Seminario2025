@echo off
REM Script para ejecutar el sistema completo (Backend + Frontend)

echo.
echo ====================================
echo  Sistema de Gestión de Proyectos
echo ====================================
echo.

REM Verificar si los directorios existen
if not exist "backend" (
    echo Error: Directorio 'backend' no encontrado
    exit /b 1
)

if not exist "frontend" (
    echo Error: Directorio 'frontend' no encontrado
    exit /b 1
)

echo [1/4] Instalando dependencias del backend...
cd backend
pip install -r requirements.txt -q
cd ..

echo [2/4] Instalando dependencias del frontend...
cd frontend
call npm install -q
cd ..

echo [3/4] Preparando base de datos...
cd backend
python seed.py > nul 2>&1
cd ..

echo [4/4] Iniciando servidor backend en puerto 5000...
start cmd /k "cd backend && python run.py"

echo.
echo Iniciando frontend en puerto 3000...
start cmd /k "cd frontend && npm start"

echo.
echo ====================================
echo  ✅ Sistema iniciado!
echo ====================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Credenciales de prueba:
echo   Admin:    admin@example.com / admin123
echo   Cliente:  cliente@example.com / cliente123
echo.
echo Presiona una tecla para salir...
pause > nul
