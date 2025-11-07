#!/usr/bin/env pwsh
# Build script for Hugo site

Write-Host "Building Hugo site..." -ForegroundColor Cyan

# Build the site from the current directory
hugo --minify

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Build successful! Site generated in public/ directory." -ForegroundColor Green
    Write-Host "✓ You can now commit and push the changes." -ForegroundColor Green
} else {
    Write-Host "✗ Build failed!" -ForegroundColor Red
    exit 1
}
Set-Location -Path "$PSScriptRoot"
