@echo off
REM Inphora Website Deployment Script (Batch)
REM Server: Hetzner 178.105.71.89
REM User: root

setlocal enabledelayedexpansion

REM Server Configuration
set SERVER_IP=178.105.71.89
set SERVER_USER=root
set SERVER_PASS=ControL.4028s
set SERVER_PATH=/var/www/inphora
set BACKUP_PATH=/var/backups/inphora

echo ========================================
echo Inphora Website Deployment Script
echo Target Server: %SERVER_IP%
echo ========================================

REM Check if sshpass is available
where sshpass >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: sshpass is not installed
    echo Please install Git Bash or WSL to get sshpass
    echo Or use the PowerShell script instead
    pause
    exit /b 1
)

REM Test SSH connection
echo Testing SSH connection...
sshpass -p "%SERVER_PASS%" ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null %SERVER_USER%@%SERVER_IP% "echo 'Connection successful'"
if %errorlevel% neq 0 (
    echo ERROR: Failed to connect to server
    pause
    exit /b 1
)
echo Connection successful

REM Check server structure
echo Checking server structure...
sshpass -p "%SERVER_PASS%" ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null %SERVER_USER%@%SERVER_IP% "mkdir -p %SERVER_PATH% %BACKUP_PATH%"

REM Backup existing site
echo Creating backup...
for /f "tokens=2 delims==" %%a in ('wmic OS Get localdatetime /value') do set "dt=%%a"
set "BACKUP_NAME=inphora_backup_%dt:~0,8%_%dt:~8,6%"
sshpass -p "%SERVER_PASS%" ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null %SERVER_USER%@%SERVER_IP% "if [ -d %SERVER_PATH% ] && [ \"\$(ls -A %SERVER_PATH% 2>/dev/null)\" ]; then cp -r %SERVER_PATH% %BACKUP_PATH%/%BACKUP_NAME%; echo 'Backup created'; else echo 'No existing site to backup'; fi"

REM Build project
echo Building project...
if not exist node_modules (
    echo Installing dependencies...
    npm install
    if %errorlevel% neq 0 (
        echo ERROR: npm install failed
        pause
        exit /b 1
    )
)

echo Running production build...
npm run build
if %errorlevel% neq 0 (
    echo ERROR: Build failed
    pause
    exit /b 1
)
echo Build successful

REM Create temp directory
echo Creating temporary directory...
for /f "tokens=2 delims==" %%a in ('wmic OS Get localdatetime /value') do set "ts=%%a"
set "TEMP_DIR=/tmp/inphora_deploy_%ts:~0,10%"
sshpass -p "%SERVER_PASS%" ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null %SERVER_USER%@%SERVER_IP% "mkdir -p %TEMP_DIR%"

REM Upload files
echo Uploading files...

if exist .next (
    echo Uploading .next directory...
    sshpass -p "%SERVER_PASS%" scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -r .next\* %SERVER_USER%@%SERVER_IP%:%TEMP_DIR%/
)

if exist public (
    echo Uploading public directory...
    sshpass -p "%SERVER_PASS%" scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -r public\* %SERVER_USER%@%SERVER_IP%:%TEMP_DIR%/
)

if exist package.json (
    echo Uploading package.json...
    sshpass -p "%SERVER_PASS%" scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null package.json %SERVER_USER%@%SERVER_IP%:%TEMP_DIR%/
)

REM Upload Next.js config if exists
if exist next.config.js (
    echo Uploading next.config.js...
    sshpass -p "%SERVER_PASS%" scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null next.config.js %SERVER_USER%@%SERVER_IP%:%TEMP_DIR%/
)

if exist next.config.mjs (
    echo Uploading next.config.mjs...
    sshpass -p "%SERVER_PASS%" scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null next.config.mjs %SERVER_USER%@%SERVER_IP%:%TEMP_DIR%/
)

REM Deploy the site
echo Deploying the site...
sshpass -p "%SERVER_PASS%" ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null %SERVER_USER%@%SERVER_IP% ^
"TEMP_DIR=$(ls -d /tmp/inphora_deploy_* | tail -1); ^
if [ -d %SERVER_PATH%/.next/cache ]; then mv %SERVER_PATH%/.next/cache /tmp/cache_backup; fi; ^
rm -rf %SERVER_PATH%/*; ^
mv $TEMP_DIR/* %SERVER_PATH%/; ^
if [ -d /tmp/cache_backup ]; then mkdir -p %SERVER_PATH%/.next; mv /tmp/cache_backup %SERVER_PATH%/.next/; fi; ^
chown -R www-data:www-data %SERVER_PATH% 2>/dev/null || true; ^
chmod -R 755 %SERVER_PATH%; ^
rm -rf $TEMP_DIR; ^
echo 'Deployment completed'"

REM Restart services
echo Restarting web services...
sshpass -p "%SERVER_PASS%" ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null %SERVER_USER%@%SERVER_IP% ^
"if command -v systemctl &> /dev/null; then ^
    if systemctl is-active --quiet nginx 2>/dev/null; then systemctl reload nginx && echo 'Nginx reloaded'; fi; ^
    if systemctl is-active --quiet apache2 2>/dev/null; then systemctl reload apache2 && echo 'Apache2 reloaded'; fi; ^
    if systemctl is-active --quiet pm2 2>/dev/null; then pm2 restart all && echo 'PM2 processes restarted'; fi; ^
fi"

REM Verify deployment
echo Verifying deployment...
sshpass -p "%SERVER_PASS%" ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null %SERVER_USER%@%SERVER_IP% ^
"if [ -f %SERVER_PATH%/package.json ]; then echo 'Core files verified'; else echo 'ERROR: Core files missing' && exit 1; fi; ^
if [ -d %SERVER_PATH%/.next ]; then echo 'Build files verified'; else echo 'ERROR: Build files missing' && exit 1; fi"

REM Cleanup
echo Cleaning up...
sshpass -p "%SERVER_PASS%" ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null %SERVER_USER%@%SERVER_IP% ^
"if [ -d %BACKUP_PATH% ]; then cd %BACKUP_PATH% && ls -t | tail -n +6 | xargs -r rm -rf; fi"

echo.
echo ========================================
echo 🎉 Deployment completed successfully!
echo Website is now live on: http://%SERVER_IP%
echo ========================================
pause
