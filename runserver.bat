@echo off

REM Iniciar WSL y arrancar el servicio de Redis primero
wsl -d ubuntu -e sh -c "echo Iniciando Redis... && echo 'laura99945@@' | sudo -S service redis-server start"

REM Esperar 5 segundos antes de continuar
timeout /t 2 /nobreak

REM Comprobar si ya existen ventanas con los procesos ejecutándose
tasklist /FI "WINDOWTITLE eq ArgOnline Backend" | find /I "cmd.exe" >nul
if errorlevel 1 (
    REM Navegar al directorio del backend y arrancar el servidor
    cd /d "C:\Users\Chipi Chapa\Desktop\ArgOnline\backend"
    start "ArgOnline Backend" cmd /k "npm run server"
)

tasklist /FI "WINDOWTITLE eq ArgOnline Frontend" | find /I "cmd.exe" >nul
if errorlevel 1 (
    REM Navegar al directorio del frontend y arrancar el servidor
    cd /d "C:\Users\Chipi Chapa\Desktop\ArgOnline\frontend"
    start "ArgOnline Frontend" cmd /k "npm run dev"
)

tasklist /FI "WINDOWTITLE eq ArgOnline Prisma Studio" | find /I "cmd.exe" >nul
if errorlevel 1 (
    REM Navegar al directorio donde está Prisma y arrancar Prisma Studio
    cd /d "C:\Users\Chipi Chapa\Desktop\ArgOnline\backend"
    start "ArgOnline Prisma Studio" cmd /k "npx prisma studio"
)

REM Finaliza el script
echo Todos los procesos han sido iniciados.
pause
