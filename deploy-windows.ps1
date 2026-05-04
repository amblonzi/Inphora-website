# Inphora Website Deployment Script for Windows (without sshpass)
# Uses PowerShell and Windows built-in tools
# Server: Hetzner 178.105.71.89

param(
    [switch]$SkipBuild,
    [switch]$Force
)

# Server Configuration
$SERVER_IP = "178.105.71.89"
$SERVER_USER = "root"
$SERVER_PASS = "ControL.4028s"
$SERVER_PATH = "/var/www/inphora"
$BACKUP_PATH = "/var/backups/inphora"

# Colors for output
function Write-Log {
    param([string]$Message, [string]$Level = "INFO")
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    
    switch ($Level) {
        "ERROR" { Write-Host "[$timestamp] ERROR: $Message" -ForegroundColor Red }
        "WARNING" { Write-Host "[$timestamp] WARNING: $Message" -ForegroundColor Yellow }
        "SUCCESS" { Write-Host "[$timestamp] SUCCESS: $Message" -ForegroundColor Green }
        default { Write-Host "[$timestamp] INFO: $Message" -ForegroundColor Cyan }
    }
}

# Check if we can use sshpass
function Test-SshPass {
    try {
        $null = Get-Command sshpass -ErrorAction Stop
        return $true
    }
    catch {
        return $false
    }
}

# Create SSH script with embedded password
function New-SSHScript {
    param([string]$Commands)
    
    $scriptContent = @"
#!/usr/bin/expect -f

set timeout 30
spawn ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null $SERVER_USER@$SERVER_IP

expect {
    "password:" {
        send "$SERVER_PASS\r"
        exp_continue
    }
    "Password:" {
        send "$SERVER_PASS\r"
        exp_continue
    }
    eof
}
"@
    
    return $scriptContent
}

# Create SCP script with embedded password
function New-SCPScript {
    param(
        [string]$Source,
        [string]$Destination,
        [switch]$IsDirectory
    )
    
    $recursive = if ($IsDirectory) { "-r" } else { "" }
    
    $scriptContent = @"
#!/usr/bin/expect -f

set timeout 60
spawn scp $recursive -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null "$Source" $SERVER_USER@$SERVER_IP`:"$Destination"

expect {
    "password:" {
        send "$SERVER_PASS\r"
        exp_continue
    }
    "Password:" {
        send "$SERVER_PASS\r"
        exp_continue
    }
    eof
}
"@
    
    return $scriptContent
}

# Execute command using expect script
function Invoke-SSHCommand {
    param([string]$Command)
    
    if (Test-SshPass) {
        try {
            $result = sshpass -p "$SERVER_PASS" ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null "$SERVER_USER@$SERVER_IP" $Command
            return $result
        }
        catch {
            Write-Log "SSH command failed: $Command" -Level "ERROR"
            Write-Log "Error: $_" -Level "ERROR"
            throw
        }
    }
    else {
        # Fallback: Create temporary expect script
        $tempScript = [System.IO.Path]::GetTempFileName()
        $expectScript = @"
#!/usr/bin/expect -f
set timeout 30
spawn ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null $SERVER_USER@$SERVER_IP

expect {
    "password:" {
        send "$SERVER_PASS\r"
        exp_continue
    }
    "Password:" {
        send "$SERVER_PASS\r"
        exp_continue
    }
    eof
}
"@
        
        try {
            # Save expect script
            $expectScript | Out-File -FilePath $tempScript -Encoding UTF8
            
            # Execute command
            $fullCommand = "$expectScript`n$Command"
            $result = expect -f $tempScript -c "set timeout 30; spawn ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null $SERVER_USER@$SERVER_IP; expect password { send \"$SERVER_PASS\r\" }; expect \"$SERVER_USER@*\" { send \"$Command\r\" }; expect \"$SERVER_USER@*\" { send \"exit\r\" }; expect eof"
            
            return $result
        }
        catch {
            Write-Log "Expect script failed. Please install sshpass or expect." -Level "ERROR"
            Write-Log "Install sshpass: https://github.com/kevinburke/sshpass/releases" -Level "ERROR"
            Write-Log "Or use WSL: wsl --install" -Level "ERROR"
            throw
        }
        finally {
            if (Test-Path $tempScript) {
                Remove-Item $tempScript -Force
            }
        }
    }
}

# Main deployment function
function Start-WindowsDeployment {
    Write-Log "Starting Inphora Website Deployment (Windows)"
    Write-Log "Target Server: $SERVER_IP"
    
    # Check dependencies
    Write-Log "Checking deployment method..."
    
    if (Test-SshPass) {
        Write-Log "Using sshpass for authentication" -Level "SUCCESS"
    }
    else {
        Write-Log "sshpass not found. Please install it for easier deployment:" -Level "WARNING"
        Write-Log "1. Download from: https://github.com/kevinburke/sshpass/releases" -Level "WARNING"
        Write-Log "2. Install Git for Windows (includes Git Bash with sshpass)" -Level "WARNING"
        Write-Log "3. Use WSL: wsl --install" -Level "WARNING"
        Write-Log ""
        Write-Log "For now, you can deploy manually using these steps:" -Level "WARNING"
        Write-Log ""
        
        # Provide manual deployment instructions
        Write-Log "MANUAL DEPLOYMENT INSTRUCTIONS:" -Level "SUCCESS"
        Write-Log "1. Open Git Bash or WSL terminal" -Level "INFO"
        Write-Log "2. Navigate to project directory: cd '$PWD'" -Level "INFO"
        Write-Log "3. Run: chmod +x deploy.sh && ./deploy.sh" -Level "INFO"
        Write-Log ""
        Write-Log "OR use these manual SSH commands:" -Level "INFO"
        Write-Log "ssh root@$SERVER_IP" -Level "INFO"
        Write-Log "# Password: $SERVER_PASS" -Level "INFO"
        Write-Log "mkdir -p $SERVER_PATH $BACKUP_PATH" -Level "INFO"
        Write-Log "exit" -Level "INFO"
        Write-Log ""
        Write-Log "Then upload files using SCP or FileZilla." -Level "INFO"
        
        return
    }
    
    # Continue with automated deployment if sshpass is available
    try {
        # Test connection
        Write-Log "Testing SSH connection..."
        $testResult = Invoke-SSHCommand "echo 'Connection successful'"
        if ($testResult -eq "Connection successful") {
            Write-Log "SSH connection successful" -Level "SUCCESS"
        }
        
        # Check server structure
        Write-Log "Checking server structure..."
        Invoke-SSHCommand "mkdir -p $SERVER_PATH $BACKUP_PATH"
        
        # Backup existing site
        Write-Log "Creating backup..."
        $backupName = "inphora_backup_$(Get-Date -Format 'yyyyMMdd_HHmmss')"
        $hasFiles = Invoke-SSHCommand "[ -d $SERVER_PATH ] && [ \"\$(ls -A $SERVER_PATH 2>/dev/null)\" ] && echo 'has_files' || echo 'empty'"
        if ($hasFiles -eq "has_files") {
            Invoke-SSHCommand "cp -r $SERVER_PATH $BACKUP_PATH/$backupName"
            Write-Log "Backup created: $backupName" -Level "SUCCESS"
        }
        
        # Build project
        if (-not $SkipBuild) {
            Write-Log "Building project..."
            if (-not (Test-Path "node_modules")) {
                Write-Log "Installing dependencies..."
                npm install
                if ($LASTEXITCODE -ne 0) { throw "npm install failed" }
            }
            
            Write-Log "Running production build..."
            npm run build
            if ($LASTEXITCODE -ne 0) { throw "npm build failed" }
            Write-Log "Build successful" -Level "SUCCESS"
        }
        
        # Upload files
        Write-Log "Uploading files..."
        $tempDir = "/tmp/inphora_deploy_$(Get-Date -UFormat %s)"
        Invoke-SSHCommand "mkdir -p $tempDir"
        
        if (Test-Path ".next") {
            Write-Log "Uploading .next directory..."
            sshpass -p "$SERVER_PASS" scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -r .next\* "$SERVER_USER@$SERVER_IP`:$tempDir/"
        }
        
        if (Test-Path "public") {
            Write-Log "Uploading public directory..."
            sshpass -p "$SERVER_PASS" scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -r public\* "$SERVER_USER@$SERVER_IP`:$tempDir/"
        }
        
        if (Test-Path "package.json") {
            Write-Log "Uploading package.json..."
            sshpass -p "$SERVER_PASS" scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null package.json "$SERVER_USER@$SERVER_IP`:$tempDir/"
        }
        
        # Deploy
        Write-Log "Deploying site..."
        Invoke-SSHCommand @"
TEMP_DIR=\$(ls -d /tmp/inphora_deploy_* | tail -1)
rm -rf $SERVER_PATH/*
mv \$TEMP_DIR/* $SERVER_PATH/
chown -R www-data:www-data $SERVER_PATH 2>/dev/null || true
chmod -R 755 $SERVER_PATH
rm -rf \$TEMP_DIR
"@
        
        # Restart services
        Write-Log "Restarting services..."
        Invoke-SSHCommand @"
if command -v systemctl &> /dev/null; then
    systemctl reload nginx 2>/dev/null || echo "nginx not found"
    systemctl reload apache2 2>/dev/null || echo "apache2 not found"
    pm2 restart all 2>/dev/null || echo "pm2 not found"
fi
"@
        
        Write-Log "🎉 Deployment completed successfully!" -Level "SUCCESS"
        Write-Log "Website is now live on: http://$SERVER_IP" -Level "SUCCESS"
        
    }
    catch {
        Write-Log "Deployment failed: $_" -Level "ERROR"
        exit 1
    }
}

# Run deployment
Start-WindowsDeployment
