#!/bin/bash

# Inphora Website Deployment Script
# Server: Hetzner 178.105.71.89
# User: root

set -e  # Exit on any error

# Server Configuration
SERVER_IP="178.105.71.89"
SERVER_USER="root"
SERVER_PASS="ControL.4028s"
SERVER_PATH="/var/www/inphora"
BACKUP_PATH="/var/backups/inphora"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo -e "${GREEN}[$(date '+%Y-%m-%d %H:%M:%S')] $1${NC}"
}

error() {
    echo -e "${RED}[$(date '+%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}"
}

warning() {
    echo -e "${YELLOW}[$(date '+%Y-%m-%d %H:%M:%S')] WARNING: $1${NC}"
}

info() {
    echo -e "${BLUE}[$(date '+%Y-%m-%d %H:%M:%S')] INFO: $1${NC}"
}

# Function to execute SSH commands
ssh_exec() {
    sshpass -p "$SERVER_PASS" ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null "$SERVER_USER@$SERVER_IP" "$1"
}

# Function to upload files via SCP
scp_upload() {
    sshpass -p "$SERVER_PASS" scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -r "$1" "$SERVER_USER@$SERVER_IP:$2"
}

# Check if required tools are installed
check_dependencies() {
    log "Checking dependencies..."
    
    if ! command -v sshpass &> /dev/null; then
        error "sshpass is not installed. Please install it first:"
        error "Ubuntu/Debian: sudo apt-get install sshpass"
        error "CentOS/RHEL: sudo yum install sshpass"
        error "macOS: brew install sshpass"
        exit 1
    fi
    
    if ! command -v ssh &> /dev/null; then
        error "SSH client is not installed"
        exit 1
    fi
    
    log "Dependencies check passed"
}

# Test SSH connection
test_connection() {
    log "Testing SSH connection to $SERVER_IP..."
    
    if ssh_exec "echo 'Connection successful'" > /dev/null 2>&1; then
        log "SSH connection successful"
    else
        error "Failed to connect to server. Please check:"
        error "1. Server IP: $SERVER_IP"
        error "2. SSH service is running on server"
        error "3. Credentials are correct"
        error "4. Network connectivity"
        exit 1
    fi
}

# Check server structure
check_server_structure() {
    log "Checking server structure..."
    
    # Create necessary directories if they don't exist
    ssh_exec "mkdir -p $SERVER_PATH $BACKUP_PATH"
    
    # Check if web directory exists
    if ssh_exec "[ -d $SERVER_PATH ]"; then
        log "Server directory structure OK"
    else
        error "Server directory structure issue"
        exit 1
    fi
    
    # Display current structure
    info "Current server structure:"
    ssh_exec "ls -la $SERVER_PATH/ 2>/dev/null || echo 'Directory is empty'"
}

# Backup existing site
backup_existing_site() {
    log "Creating backup of existing site..."
    
    BACKUP_NAME="inphora_backup_$(date +%Y%m%d_%H%M%S)"
    
    if ssh_exec "[ -d $SERVER_PATH ] && [ \"\$(ls -A $SERVER_PATH 2>/dev/null)\" ]"; then
        ssh_exec "cp -r $SERVER_PATH $BACKUP_PATH/$BACKUP_NAME"
        log "Backup created: $BACKUP_NAME"
    else
        log "No existing site to backup"
    fi
}

# Build the project
build_project() {
    log "Building the project..."
    
    if [ ! -d "node_modules" ]; then
        log "Installing dependencies..."
        npm install
    fi
    
    log "Running production build..."
    npm run build
    
    if [ $? -eq 0 ]; then
        log "Build successful"
    else
        error "Build failed"
        exit 1
    fi
}

# Upload files to server
upload_files() {
    log "Uploading files to server..."
    
    # Create temporary directory for upload
    TEMP_DIR="/tmp/inphora_deploy_$(date +%s)"
    ssh_exec "mkdir -p $TEMP_DIR"
    
    # Upload build files
    if [ -d ".next" ]; then
        info "Uploading .next directory..."
        scp_upload ".next/" "$TEMP_DIR/"
    fi
    
    if [ -d "public" ]; then
        info "Uploading public directory..."
        scp_upload "public/" "$TEMP_DIR/"
    fi
    
    if [ -f "package.json" ]; then
        info "Uploading package.json..."
        scp_upload "package.json" "$TEMP_DIR/"
    fi
    
    if [ -f "next.config.js" ] || [ -f "next.config.mjs" ] || [ -f "next.config.ts" ]; then
        info "Uploading Next.js config..."
        scp_upload "next.config.*" "$TEMP_DIR/"
    fi
    
    log "Files uploaded successfully"
}

# Deploy the site
deploy_site() {
    log "Deploying the site..."
    
    TEMP_DIR="/tmp/inphora_deploy_*"
    
    # Move files to production directory
    ssh_exec "
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
    "
    
    log "Site deployed successfully"
}

# Restart services
restart_services() {
    log "Restarting web services..."
    
    # Check for common web servers and restart them
    ssh_exec "
        if command -v systemctl &> /dev/null; then
            if systemctl is-active --quiet nginx 2>/dev/null; then
                systemctl reload nginx
                log 'Nginx reloaded'
            fi
            if systemctl is-active --quiet apache2 2>/dev/null; then
                systemctl reload apache2
                log 'Apache2 reloaded'
            fi
            if systemctl is-active --quiet pm2 2>/dev/null; then
                pm2 restart all
                log 'PM2 processes restarted'
            fi
        fi
    "
}

# Verify deployment
verify_deployment() {
    log "Verifying deployment..."
    
    # Check if files exist
    if ssh_exec "[ -f $SERVER_PATH/package.json ]"; then
        log "Core files verified"
    else
        error "Core files missing"
        exit 1
    fi
    
    # Check if build directory exists
    if ssh_exec "[ -d $SERVER_PATH/.next ]"; then
        log "Build files verified"
    else
        error "Build files missing"
        exit 1
    fi
    
    log "Deployment verification successful"
}

# Cleanup
cleanup() {
    log "Cleaning up temporary files..."
    
    # Remove old backups (keep last 5)
    ssh_exec "
        if [ -d $BACKUP_PATH ]; then
            cd $BACKUP_PATH
            ls -t | tail -n +6 | xargs -r rm -rf
        fi
    "
    
    log "Cleanup completed"
}

# Main deployment function
main() {
    log "Starting Inphora Website Deployment"
    log "Target Server: $SERVER_IP"
    
    check_dependencies
    test_connection
    check_server_structure
    backup_existing_site
    build_project
    upload_files
    deploy_site
    restart_services
    verify_deployment
    cleanup
    
    log "🎉 Deployment completed successfully!"
    log "Website is now live on: http://$SERVER_IP"
}

# Handle script interruption
trap 'error "Deployment interrupted"; exit 1' INT

# Run main function
main "$@"
