@echo off
echo ========================================
echo    Step 1 Platform - Starting...
echo ========================================
echo.

echo [1/4] Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo Error installing dependencies!
    pause
    exit /b 1
)

echo.
echo [2/4] Starting backend server...
start "Step 1 Backend" cmd /k "npm run start:backend"

echo.
echo [3/4] Waiting for backend to start...
timeout /t 5 /nobreak > nul

echo.
echo [4/4] Starting frontend server...
start "Step 1 Frontend" cmd /k "npm run start:frontend"

echo.
echo ========================================
echo    Step 1 Platform Started Successfully!
echo ========================================
echo.
echo 🌐 Main Website: http://localhost:3000
echo 🧪 Test Page: http://localhost:3000/test.html
echo 🔧 Admin Panel: http://localhost:3000/admin.html
echo 📡 API: http://localhost:3001/api
echo.
echo Admin Login:
echo Username: admin
echo Password: admin123
echo.
echo Opening test page in browser...
timeout /t 3 /nobreak > nul
start http://localhost:3000/test.html
echo.
echo Press any key to close this window...
pause > nul
