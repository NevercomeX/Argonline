@echo off
setlocal

REM --- CONFIGURACION ---
set "BACKEND_DIR=%~dp0Backend"
set "FRONTEND_DIR=%~dp0frontend"
set "BROWSER_PATH=C:\Program Files\BraveSoftware\Brave-Browser\Application\brave.exe"
set "APP_URL=http://localhost:3000/"

echo ===================================================
echo      ARGONLINE SUPERVISOR - ROBUST MODE
echo ===================================================

REM --- 1. LIMPIEZA INICIAL ---
echo [1/3] Limpiando procesos antiguos...
call :KILL_ALL_PROCESSES

REM --- 2. INICIANDO SERVIDORES ---
echo [2/3] Iniciando servicios...

echo   - Iniciando Char Server...
cd /d "%BACKEND_DIR%"
start "ArgOnline Char" cmd /k "pnpm run char"

echo   - Iniciando Auth Server...
cd /d "%BACKEND_DIR%"
start "ArgOnline Auth" cmd /k "pnpm run auth"

echo   - Iniciando Map Server...
cd /d "%BACKEND_DIR%"
start "ArgOnline Map" cmd /k "pnpm run map"

echo   - Iniciando Prisma Studio...
cd /d "%BACKEND_DIR%"
start "ArgOnline Prisma Studio" cmd /k "pnpm run studio"

echo   - Iniciando Frontend...
cd /d "%FRONTEND_DIR%"
start "ArgOnline Frontend" cmd /k "pnpm run dev"

REM --- 3. ABRIR NAVEGADOR ---
echo [3/3] Abriendo navegador...
start "" "%BROWSER_PATH%" "%APP_URL%"

echo.
echo ===================================================
echo   SISTEMA ACTIVO. CIERRA CUALQUIER VENTANA DE
echo   SERVIDOR PARA DETENER TODO EL SISTEMA.
echo ===================================================

REM Esperar un tiempo prudente para que todo arranque (10s)
echo Esperando 10 segundos para estabilizar servidores...
timeout /t 10 /nobreak >nul

:MONITOR_LOOP
REM Verifica cada 2 segundos
timeout /t 2 /nobreak >nul

REM Usamos tasklist /V (verbose) y find /I (case insensitive) para buscar el titulo parcial
REM Esto es mas robusto que buscar el titulo exacto

tasklist /V | find /I "ArgOnline Char" >nul
if errorlevel 1 (
    echo [MONITOR] Ventana 'ArgOnline Char' no encontrada.
    goto SHUTDOWN
)

tasklist /V | find /I "ArgOnline Auth" >nul
if errorlevel 1 (
    echo [MONITOR] Ventana 'ArgOnline Auth' no encontrada.
    goto SHUTDOWN
)

tasklist /V | find /I "ArgOnline Map" >nul
if errorlevel 1 (
    echo [MONITOR] Ventana 'ArgOnline Map' no encontrada.
    goto SHUTDOWN
)

tasklist /V | find /I "ArgOnline Frontend" >nul
if errorlevel 1 (
    echo [MONITOR] Ventana 'ArgOnline Frontend' no encontrada.
    goto SHUTDOWN
)

REM Si llegamos aqui, todo esta bien. Repetir.
goto MONITOR_LOOP

:SHUTDOWN
echo.
echo !!!!!!! CIERRE DETECTADO !!!!!!!
echo DETENIENDO SISTEMA...
call :KILL_ALL_PROCESSES
echo Sistema apagado.
timeout /t 3 >nul
exit

:KILL_ALL_PROCESSES
taskkill /F /IM node.exe /T 2>nul
taskkill /F /FI "WINDOWTITLE eq ArgOnline Char" /T 2>nul
taskkill /F /FI "WINDOWTITLE eq ArgOnline Auth" /T 2>nul
taskkill /F /FI "WINDOWTITLE eq ArgOnline Map" /T 2>nul
taskkill /F /FI "WINDOWTITLE eq ArgOnline Frontend" /T 2>nul
taskkill /F /FI "WINDOWTITLE eq ArgOnline Prisma Studio" /T 2>nul
goto :EOF