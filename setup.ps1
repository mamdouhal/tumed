#!/usr/bin/env pwsh
# Quick setup script for TUMED Admin System

Write-Host "🚀 TUMED Admin System Setup" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Check if .env exists
if (!(Test-Path ".env")) {
    Write-Host "📝 Creating .env file from .env.example..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "✅ .env file created" -ForegroundColor Green
    Write-Host "⚠️  Please update DATABASE_URL and AUTH_SECRET in .env" -ForegroundColor Yellow
    Write-Host ""
    
    # Generate AUTH_SECRET
    Write-Host "🔑 Generating AUTH_SECRET..." -ForegroundColor Yellow
    $bytes = New-Object byte[] 32
    [Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
    $authSecret = [Convert]::ToBase64String($bytes)
    
    $envContent = Get-Content ".env" -Raw
    $envContent = $envContent -replace 'AUTH_SECRET=".*"', "AUTH_SECRET=`"$authSecret`""
    Set-Content ".env" $envContent
    
    Write-Host "✅ AUTH_SECRET generated and saved" -ForegroundColor Green
    Write-Host ""
}

Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install
Write-Host ""

Write-Host "🗄️  Setting up database..." -ForegroundColor Yellow
Write-Host "Choose database option:" -ForegroundColor Cyan
Write-Host "1. Use Prisma Postgres (local, automatic)" -ForegroundColor White
Write-Host "2. Use existing PostgreSQL database" -ForegroundColor White
$choice = Read-Host "Enter choice (1 or 2)"

if ($choice -eq "1") {
    Write-Host "Starting Prisma Postgres..." -ForegroundColor Yellow
    npx prisma dev
} else {
    Write-Host "⚠️  Make sure your DATABASE_URL is configured in .env" -ForegroundColor Yellow
    Write-Host "Running migrations..." -ForegroundColor Yellow
    npx prisma migrate dev --name init
}

Write-Host ""
Write-Host "🌱 Seeding database with admin user..." -ForegroundColor Yellow
npm run db:seed
Write-Host ""

Write-Host "✅ Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Cyan
Write-Host "1. Start dev server: npm run dev" -ForegroundColor White
Write-Host "2. Visit: http://localhost:3000/login" -ForegroundColor White
Write-Host "3. Login with:" -ForegroundColor White
Write-Host "   Email: admin@tumed.org" -ForegroundColor Yellow
Write-Host "   Password: admin123" -ForegroundColor Yellow
Write-Host ""
Write-Host "🎉 Happy coding!" -ForegroundColor Green
