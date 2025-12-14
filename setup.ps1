# MERN Bug Tracker - Quick Setup Guide

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   MERN Bug Tracker - Quick Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js is installed: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js is not installed. Please install Node.js first." -ForegroundColor Red
    Write-Host "  Download from: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Check if MongoDB is running
Write-Host "`nChecking MongoDB connection..." -ForegroundColor Yellow
Write-Host "  Note: Make sure MongoDB is running before starting the backend" -ForegroundColor Gray

# Install Backend Dependencies
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "Installing Backend Dependencies..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Set-Location -Path "backend"
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Backend dependencies installed successfully!" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to install backend dependencies" -ForegroundColor Red
    exit 1
}

# Install Frontend Dependencies
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "Installing Frontend Dependencies..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Set-Location -Path "..\frontend"
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Frontend dependencies installed successfully!" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to install frontend dependencies" -ForegroundColor Red
    exit 1
}

Set-Location -Path ".."

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "   Installation Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan

Write-Host "`nNext Steps:" -ForegroundColor Yellow
Write-Host "  1. Make sure MongoDB is running" -ForegroundColor White
Write-Host "  2. Configure backend/.env file (copy from .env.example)" -ForegroundColor White
Write-Host "  3. Open TWO terminal windows:" -ForegroundColor White
Write-Host ""
Write-Host "     Terminal 1 (Backend):" -ForegroundColor Cyan
Write-Host "       cd backend" -ForegroundColor Gray
Write-Host "       npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "     Terminal 2 (Frontend):" -ForegroundColor Cyan
Write-Host "       cd frontend" -ForegroundColor Gray
Write-Host "       npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "  4. Open browser: http://localhost:3000" -ForegroundColor White
Write-Host ""
Write-Host "To run tests:" -ForegroundColor Yellow
Write-Host "  Backend tests: cd backend && npm test" -ForegroundColor Gray
Write-Host "  Frontend tests: cd frontend && npm test" -ForegroundColor Gray
Write-Host ""
Write-Host "For more information, see README.md" -ForegroundColor Cyan
Write-Host ""
