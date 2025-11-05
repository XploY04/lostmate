#!/bin/bash

# LostMate Setup Script
# Run this script to set up and start your LostMate app

echo "🎉 Welcome to LostMate Setup!"
echo "================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    exit 1
fi

echo "✅ npm found: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
echo "   This may take a few minutes..."
echo ""

npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Dependencies installed successfully!"
    echo ""
    echo "================================"
    echo "🚀 Setup Complete!"
    echo "================================"
    echo ""
    echo "To start the app, run:"
    echo "   npm start"
    echo ""
    echo "Then:"
    echo "   • Press 'a' for Android emulator"
    echo "   • Press 'i' for iOS simulator"
    echo "   • Scan QR code with Expo Go app"
    echo ""
    echo "📚 Check QUICKSTART.md for more info"
    echo ""
else
    echo ""
    echo "❌ Installation failed."
    echo "   Try: npm install --legacy-peer-deps"
    exit 1
fi
