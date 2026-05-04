# Inphora Website Deployment Script (PowerShell)
# Server: Hetzner 178.105.71.89
# User: root

param(
    [switch]$SkipBuild,
    [switch]$Force
)

# Error handling
$ErrorActionPreference = "Stop"

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

# Function to execute SSH commands
function Invoke-SSHCommand {
    param([string]$Command)
    
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

# Function to upload files via SCP
function Copy-ToServer {
    param(
        [string]$Source,
        [string]$Destination
    )
    
    try {
        sshpass -p "$SERVER_PASS" scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -r $Source "$SERVER_USER@$SERVER_IP`:$Destination"
        Write-Log "Uploaded: $Source -> $Destination"
    }
    catch {
        Write-Log "Failed to upload: $Source" -Level "ERROR"
        Write-Log "Error: $_" -Level "ERROR"
        throw
    }
}

# Check if required tools are installed
function Test-Dependencies {
    Write-Log "Checking dependencies..."
    
    # Check for sshpass
    try {
        $null = Get-Command sshpass -ErrorAction Stop
        Write-Log "sshpass found"
    }
    catch {
        Write-Log "sshpass is not installed. Please install it first:" -Level "ERROR"
        Write-Log "1. Download from: https://github.com/kevinburke/sshpass/releases" -Level "ERROR"
        Write-Log "2. Or use WSL: wsl --install" -Level "ERROR"
        Write-Log "3. Or use Git Bash which includes sshpass" -Level "ERROR"
        exit 1
    }
    
    # Check for ssh
    try {
        $null = Get-Command ssh -ErrorAction Stop
        Write-Log "SSH client found"
    }
    catch {
        Write-Log "SSH client is not installed" -Level "ERROR"
        exit 1
    }
    
    # Check for scp
    try {
        $null = Get-Command scp -ErrorAction Stop
        Write-Log "SCP found"
    }
    catch {
        Write-Log "SCP is not installed" -Level "ERROR"
        exit 1
    }
    
    Write-Log "Dependencies check passed" -Level "SUCCESS"
}

# Test SSH connection
function Test-Connection {
    Write-Log "Testing SSH connection to $SERVER_IP..."
    
    try {
        $result = Invoke-SSHCommand "echo 'Connection successful'"
        if ($result -eq "Connection successful") {
            Write-Log "SSH connection successful" -Level "SUCCESS"
        }
        else {
            throw "Unexpected response"
        }
    }
    catch {
        Write-Log "Failed to connect to server. Please check:" -Level "ERROR"
        Write-Log "1. Server IP: $SERVER_IP" -Level "ERROR"
        Write-Log "2. SSH service is running on server" -Level "ERROR"
        Write-Log "3. Credentials are correct" -Level "ERROR"
        Write-Log "4. Network connectivity" -Level "ERROR"
        exit 1
    }
}

# Check server structure
function Test-ServerStructure {
    Write-Log "Checking server structure..."
    
    try {
        # Create necessary directories
        Invoke-SSHCommand "mkdir -p $SERVER_PATH $BACKUP_PATH"
        
        # Check if directories exist
        $pathExists = Invoke-SSHCommand "[ -d $SERVER_PATH ] && echo 'exists' || echo 'missing'"
        if ($pathExists -eq "exists") {
            Write-Log "Server directory structure OK" -Level "SUCCESS"
        }
        else {
            throw "Server directory structure issue"
        }
        
        # Display current structure
        Write-Log "Current server structure:"
        try {
            Invoke-SSHCommand "ls -la $SERVER_PATH/ 2>/dev/null || echo 'Directory is empty'"
        }
        catch {
            Write-Log "Directory is empty or inaccessible"
        }
    }
    catch {
        Write-Log "Server structure check failed: $_" -Level "ERROR"
        exit 1
    }
}

# Backup existing site
function Backup-ExistingSite {
    Write-Log "Creating backup of existing site..."
    
    try {
        $backupName = "inphora_backup_$(Get-Date -Format 'yyyyMMdd_HHmmss')"
        
        $hasFiles = Invoke-SSHCommand "[ -d $SERVER_PATH ] && [ \"\$(ls -A $SERVER_PATH 2>/dev/null)\" ] && echo 'has_files' || echo 'empty'"
        
        if ($hasFiles -eq "has_files") {
            Invoke-SSHCommand "cp -r $SERVER_PATH $BACKUP_PATH/$backupName"
            Write-Log "Backup created: $backupName" -Level "SUCCESS"
        }
        else {
            Write-Log "No existing site to backup"
        }
    }
    catch {
        Write-Log "Backup failed: $_" -Level "ERROR"
        if (-not $Force) {
            exit 1
        }
    }
}

# Build the project
function Build-Project {
    if ($SkipBuild) {
        Write-Log "Skipping build as requested"
        return
    }
    
    Write-Log "Building the project..."
    
    try {
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
    catch {
        Write-Log "Build failed: $_" -Level "ERROR"
        exit 1
    }
}

# Upload files to server
function Upload-Files {
    Write-Log "Uploading files to server..."
    
    try {
        # Create temporary directory for upload
        $tempDir = "/tmp/inphora_deploy_$(Get-Date -UFormat %s)"
        Invoke-SSHCommand "mkdir -p $tempDir"
        
        # Upload build files
        if (Test-Path ".next") {
            Write-Log "Uploading .next directory..."
            Copy-ToServer ".next/" "$tempDir/"
        }
        
        if (Test-Path "public") {
            Write-Log "Uploading public directory..."
            Copy-ToServer "public/" "$tempDir/"
        }
        
        if (Test-Path "package.json") {
            Write-Log "Uploading package.json..."
            Copy-ToServer "package.json" "$tempDir/"
        }
        
        # Upload Next.js config if exists
        $nextConfigs = Get-ChildItem -Filter "next.config.*" -ErrorAction SilentlyContinue
        if ($nextConfigs) {
            Write-Log "Uploading Next.js config..."
            foreach ($config in $nextConfigs) {
                Copy-ToServer $config.FullName "$tempDir/"
            }
        }
        
        Write-Log "Files uploaded successfully" -Level "SUCCESS"
    }
    catch {
        Write-Log "File upload failed: $_" -Level "ERROR"
        exit 1
    }
}

# Deploy the site
function Deploy-Site {
    Write-Log "Deploying the site..."
    
    try {
        $deployScript = @"
# Find the temp directory
TEMP_DIR=\$(ls -d /tmp/inphora_deploy_* | tail -1)

# Remove old files (except .next/cache for performance)
if [ -d $SERVER_PATH/.next/cache ]; then
    mv $SERVER_PATH/.next/cache /tmp/cache_backup
fi

rm -rf $SERVER_PATH/*

# Move new files
mv \$TEMP_DIR/* $SERVER_PATH/

# Restore cache if it existed
if [ -d /tmp/cache_backup ]; then
    mkdir -p $SERVER_PATH/.next
    mv /tmp/cache_backup $SERVER_PATH/.next/
fi

# Set proper permissions
chown -R www-data:www-data $SERVER_PATH 2>/dev/null || true
chmod -R 755 $SERVER_PATH

# Clean up temp directory
rm -rf \$TEMP_DIR

echo "Deployment completed"
"@
        
        Invoke-SSHCommand $deployScript
        Write-Log "Site deployed successfully" -Level "SUCCESS"
    }
    catch {
        Write-Log "Deployment failed: $_" -Level "ERROR"
        exit 1
    }
}

# Restart services
function Restart-Services {
    Write-Log "Restarting web services..."
    
    try {
        $restartScript = @"
if command -v systemctl &> /dev/null; then
    if systemctl is-active --quiet nginx 2>/dev/null; then
        systemctl reload nginx
        echo "Nginx reloaded"
    fi
    if systemctl is-active --quiet apache2 2>/dev/null; then
        systemctl reload apache2
        echo "Apache2 reloaded"
    fi
    if systemctl is-active --quiet pm2 2>/dev/null; then
        pm2 restart all
        echo "PM2 processes restarted"
    fi
fi
"@
        
        $result = Invoke-SSHCommand $restartScript
        Write-Log "Services restart result: $result"
    }
    catch {
        Write-Log "Service restart failed: $_" -Level "WARNING"
        # Don't exit on service restart failure
    }
}

# Verify deployment
function Test-Deployment {
    Write-Log "Verifying deployment..."
    
    try {
        # Check if core files exist
        $packageExists = Invoke-SSHCommand "[ -f $SERVER_PATH/package.json ] && echo 'exists' || echo 'missing'"
        if ($packageExists -eq "exists") {
            Write-Log "Core files verified" -Level "SUCCESS"
        }
        else {
            throw "Core files missing"
        }
        
        # Check if build directory exists
        $buildExists = Invoke-SSHCommand "[ -d $SERVER_PATH/.next ] && echo 'exists' || echo 'missing'"
        if ($buildExists -eq "exists") {
            Write-Log "Build files verified" -Level "SUCCESS"
        }
        else {
            throw "Build files missing"
        }
        
        Write-Log "Deployment verification successful" -Level "SUCCESS"
    }
    catch {
        Write-Log "Deployment verification failed: $_" -Level "ERROR"
        exit 1
    }
}

# Cleanup
function Invoke-Cleanup {
    Write-Log "Cleaning up temporary files..."
    
    try {
        $cleanupScript = @"
if [ -d $BACKUP_PATH ]; then
    cd $BACKUP_PATH
    ls -t | tail -n +6 | xargs -r rm -rf
fi
"@
        
        Invoke-SSHCommand $cleanupScript
        Write-Log "Cleanup completed" -Level "SUCCESS"
    }
    catch {
        Write-Log "Cleanup failed: $_" -Level "WARNING"
    }
}

# Main deployment function
function Start-Deployment {
    Write-Log "Starting Inphora Website Deployment"
    Write-Log "Target Server: $SERVER_IP"
    
    Test-Dependencies
    Test-Connection
    Test-ServerStructure
    Backup-ExistingSite
    Build-Project
    Upload-Files
    Deploy-Site
    Restart-Services
    Test-Deployment
    Invoke-Cleanup
    
    Write-Log "🎉 Deployment completed successfully!" -Level "SUCCESS"
    Write-Log "Website is now live on: http://$SERVER_IP" -Level "SUCCESS"
}

# Handle script interruption
$originalErrorActionPreference = $ErrorActionPreference
try {
    Start-Deployment
}
catch {
    Write-Log "Deployment interrupted or failed: $_" -Level "ERROR"
    exit 1
}
finally {
    $ErrorActionPreference = $originalErrorActionPreference
}
