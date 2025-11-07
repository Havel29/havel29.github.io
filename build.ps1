#!/usr/bin/env pwsh
# Build script for Hugo site

Write-Host "Building Hugo site..." -ForegroundColor Cyan

# Navigate to blog directory
Set-Location -Path "$PSScriptRoot\blog"

# Build the site
hugo --minify

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Build successful! Site generated in root directory." -ForegroundColor Green
    Write-Host "✓ You can now commit and push the changes." -ForegroundColor Green
} else {
    Write-Host "✗ Build failed!" -ForegroundColor Red
    exit 1
}

# Return to root
Set-Location -Path "$PSScriptRoot"
