# Inphora Website Deployment Guide

This guide explains how to deploy the Inphora website to the Hetzner server.

## Server Information
- **IP Address**: 178.105.71.89
- **Username**: root
- **Password**: ControL.4028s
- **Deployment Path**: /var/www/inphora

## Prerequisites

### Required Tools
1. **sshpass** - For SSH authentication with password
2. **SSH client** - Usually included with Git Bash, WSL, or can be installed separately
3. **SCP** - For file transfer (usually included with SSH)

### Installing sshpass

#### Windows
**Option 1: Git Bash (Recommended)**
- Install Git for Windows from https://git-scm.com/
- Use Git Bash terminal (includes sshpass)

**Option 2: WSL (Windows Subsystem for Linux)**
```bash
wsl --install
sudo apt-get update
sudo apt-get install sshpass
```

**Option 3: Manual Installation**
- Download from https://github.com/kevinburke/sshpass/releases
- Extract and add to PATH

#### Linux (Ubuntu/Debian)
```bash
sudo apt-get update
sudo apt-get install sshpass
```

#### Linux (CentOS/RHEL)
```bash
sudo yum install sshpass
```

#### macOS
```bash
brew install sshpass
```

## Deployment Scripts

Three deployment scripts are provided:

### 1. PowerShell Script (deploy.ps1)
**Recommended for Windows users with PowerShell**

```powershell
# Run normal deployment
.\deploy.ps1

# Skip build step (if already built)
.\deploy.ps1 -SkipBuild

# Force deployment even if some steps fail
.\deploy.ps1 -Force
```

### 2. Bash Script (deploy.sh)
**For Linux, macOS, or Windows with Git Bash/WSL**

```bash
# Make executable
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

### 3. Batch Script (deploy.bat)
**For Windows CMD users**

```cmd
deploy.bat
```

## What the Scripts Do

### 1. Pre-Deployment Checks
- Verify required tools are installed
- Test SSH connection to server
- Check server directory structure

### 2. Backup
- Create backup of existing site
- Store in `/var/backups/inphora/`
- Keep last 5 backups automatically

### 3. Build
- Install dependencies if needed
- Run production build (`npm run build`)
- Verify build success

### 4. Upload
- Upload `.next/` directory (build files)
- Upload `public/` directory (static assets)
- Upload `package.json` and config files
- Use temporary directory for safe upload

### 5. Deployment
- Move files to production directory
- Set proper permissions (755)
- Preserve build cache for performance
- Clean up temporary files

### 6. Service Restart
- Reload Nginx if running
- Reload Apache2 if running
- Restart PM2 processes if running

### 7. Verification
- Verify core files exist
- Verify build files exist
- Confirm deployment success

### 8. Cleanup
- Remove old backups (keep last 5)
- Clean temporary files

## Directory Structure

### Server Structure
```
/var/www/inphora/
├── .next/                 # Next.js build files
├── public/               # Static assets
├── package.json          # Dependencies
├── next.config.*         # Next.js configuration
└── ...                   # Other build files

/var/backups/inphora/
├── inphora_backup_20240101_120000/
├── inphora_backup_20240101_130000/
└── ...                   # Previous backups
```

### Local Structure
```
inphora-website/
├── .next/                # Build output
├── public/               # Static files
├── src/                  # Source code
├── package.json          # Dependencies
├── deploy.ps1           # PowerShell deployment script
├── deploy.sh            # Bash deployment script
├── deploy.bat           # Batch deployment script
└── DEPLOYMENT.md        # This file
```

## Troubleshooting

### Connection Issues
1. **SSH Connection Failed**
   - Check server IP: 178.105.71.89
   - Verify SSH service is running on server
   - Check network connectivity
   - Verify credentials

2. **Permission Denied**
   - Check username: root
   - Check password: ControL.4028s
   - Ensure SSH key authentication is not blocking password login

### Build Issues
1. **npm install failed**
   - Check internet connection
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and try again

2. **npm run build failed**
   - Check for syntax errors in code
   - Verify all dependencies are installed
   - Check environment variables

### Upload Issues
1. **SCP failed**
   - Check disk space on server
   - Verify permissions on server directories
   - Check network stability

2. **Files missing after deployment**
   - Check if build completed successfully
   - Verify upload completed without errors
   - Check server logs

### Service Issues
1. **Services not restarting**
   - Check if systemd is available: `systemctl --version`
   - Verify service names (nginx, apache2, pm2)
   - Check service status: `systemctl status nginx`

## Manual Deployment (If Scripts Fail)

### Connect to Server
```bash
ssh root@178.105.71.89
# Password: ControL.4028s
```

### Create Directories
```bash
mkdir -p /var/www/inphora
mkdir -p /var/backups/inphora
```

### Backup Existing Site
```bash
if [ -d /var/www/inphora ] && [ "$(ls -A /var/www/inphora 2>/dev/null)" ]; then
    cp -r /var/www/inphora /var/backups/inphora/backup_$(date +%Y%m%d_%H%M%S)
fi
```

### Upload Files (from local machine)
```bash
# From your local project directory
sshpass -p "ControL.4028s" scp -r .next/ root@178.105.71.89:/var/www/inphora/
sshpass -p "ControL.4028s" scp -r public/ root@178.105.71.89:/var/www/inphora/
sshpass -p "ControL.4028s" scp package.json root@178.105.71.89:/var/www/inphora/
```

### Set Permissions
```bash
chown -R www-data:www-data /var/www/inphora
chmod -R 755 /var/www/inphora
```

### Restart Services
```bash
systemctl reload nginx
# or
systemctl reload apache2
# or
pm2 restart all
```

## Security Notes

1. **Password Authentication**: The scripts use password authentication. Consider setting up SSH keys for better security.
2. **File Permissions**: Scripts set appropriate permissions (755 for directories, 644 for files).
3. **Backups**: Automatic backups are created before each deployment.
4. **Cleanup**: Old backups are automatically cleaned up (keeps last 5).

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Verify server connectivity and credentials
3. Check the script output for specific error messages
4. Try manual deployment as a fallback

## Quick Start

1. Install sshpass (see prerequisites)
2. Open terminal in project directory
3. Run the appropriate script:
   - Windows PowerShell: `.\deploy.ps1`
   - Git Bash/WSL: `./deploy.sh`
   - Windows CMD: `deploy.bat`
4. Wait for deployment to complete
5. Visit http://178.105.71.89 to verify deployment
