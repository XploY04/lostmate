# 🎮 LostMate - Commands Reference

Quick reference for all commands you'll need to work with LostMate.

---

## 🚀 Getting Started

### Initial Setup
```bash
# Navigate to project
cd /home/xploy04/Documents/lostmate

# Install dependencies
npm install

# OR use the setup script
./setup.sh
```

---

## 📱 Running the App

### Start Development Server
```bash
npm start
```

### Platform-Specific Commands
```bash
# Run on Android
npm run android

# Run on iOS  
npm run ios

# Run on Web
npm run web
```

### Quick Keys (After `npm start`)
- Press `a` - Open on Android
- Press `i` - Open on iOS
- Press `w` - Open in web browser
- Press `r` - Reload app
- Press `m` - Toggle menu
- Press `j` - Open debugger
- Press `c` - Clear logs

---

## 🔧 Development Commands

### Clear Cache
```bash
# Clear Metro bundler cache
npm start -- --clear

# OR
npx expo start --clear

# Clear node modules and reinstall
rm -rf node_modules
rm package-lock.json
npm install
```

### TypeScript Check
```bash
# Check TypeScript errors
npx tsc --noEmit
```

### Format Code
```bash
# If you have prettier installed
npx prettier --write .
```

---

## 🛠️ Troubleshooting Commands

### Fix Dependencies
```bash
# If you get peer dependency errors
npm install --legacy-peer-deps

# Force clean install
npm ci

# Update Expo CLI
npm install -g expo-cli@latest
```

### Reset Expo
```bash
# Reset Expo cache
npx expo start --clear

# Reset Metro bundler
npx react-native start --reset-cache
```

### Fix Port Issues
```bash
# If port 19000 is in use
npx expo start --port 19001
```

---

## 📦 Package Management

### Add New Package
```bash
# For Expo packages
npx expo install package-name

# For npm packages
npm install package-name

# For dev dependencies
npm install --save-dev package-name
```

### Update Packages
```bash
# Update all packages
npm update

# Update Expo SDK
npx expo upgrade
```

### Check Outdated Packages
```bash
npm outdated
```

---

## 🏗️ Building for Production

### EAS Build (Expo Application Services)

#### Setup EAS
```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure project
eas build:configure
```

#### Build Commands
```bash
# Build for Android
eas build --platform android

# Build for iOS
eas build --platform ios

# Build for both
eas build --platform all

# Build for development
eas build --profile development --platform android
```

#### Submit to Stores
```bash
# Submit to Google Play
eas submit --platform android

# Submit to App Store
eas submit --platform ios
```

---

## 🧪 Testing Commands

### Run Tests (if you add them)
```bash
# Run Jest tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

---

## 📊 Project Info Commands

### Check Project Structure
```bash
# List all TypeScript files
find . -name "*.tsx" -o -name "*.ts" | grep -v node_modules

# Count lines of code
find . -name "*.tsx" -o -name "*.ts" | grep -v node_modules | xargs wc -l

# Project size
du -sh .
du -sh node_modules
```

### Check Dependencies
```bash
# List all dependencies
npm list --depth=0

# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix
```

---

## 🔍 Debugging Commands

### Metro Bundler
```bash
# Start Metro separately
npx react-native start

# Reset cache
npx react-native start --reset-cache
```

### Inspect
```bash
# Open React DevTools
npx react-devtools

# Run with Chrome DevTools
# Then press 'j' after npm start
```

### Logs
```bash
# View Android logs
adb logcat

# View iOS logs
xcrun simctl spawn booted log stream
```

---

## 📝 Git Commands (Optional)

### Initialize Git
```bash
# Initialize repository
git init

# Add all files
git add .

# First commit
git commit -m "Initial commit: LostMate app"

# Add remote
git remote add origin <your-repo-url>

# Push to remote
git push -u origin main
```

---

## 🎨 Useful Development Commands

### Watch File Changes
```bash
# Watch TypeScript files
npx tsc --watch
```

### Generate Icons (if you add them)
```bash
# Generate app icons
npx expo-app-icon-generator
```

### Environment Variables
```bash
# Create .env file
touch .env

# Install dotenv
npm install react-native-dotenv
```

---

## 🔄 Common Workflows

### Starting Work
```bash
cd /home/xploy04/Documents/lostmate
npm start
# Press 'a' or 'i' to run on device
```

### Making Changes
1. Edit files in your code editor
2. Save (Fast Refresh will update automatically)
3. Check device/emulator for changes
4. If issues, press 'r' to reload

### Testing a Feature
1. Open the screen/component
2. Test the functionality
3. Check for errors in terminal
4. Fix any issues and save

### Committing Changes
```bash
git add .
git commit -m "Add: new feature description"
git push
```

---

## 🆘 Emergency Commands

### Everything is Broken
```bash
# Nuclear option - complete reset
rm -rf node_modules
rm -rf .expo
rm package-lock.json
npm install
npm start -- --clear
```

### Expo Won't Start
```bash
# Kill all Expo processes
killall -9 node
npm start
```

### Port Already in Use
```bash
# Find process on port 19000
lsof -i :19000

# Kill process (replace PID)
kill -9 <PID>

# Or use different port
npx expo start --port 19001
```

---

## 📚 Quick Reference

| Command | What it does |
|---------|-------------|
| `npm install` | Install all dependencies |
| `npm start` | Start development server |
| `npm run android` | Run on Android |
| `npm run ios` | Run on iOS |
| `npm start -- --clear` | Start with cache cleared |
| `npx expo install <package>` | Install Expo-compatible package |
| `eas build` | Build for production |
| `git commit -am "msg"` | Quick commit all changes |

---

## 💡 Pro Tips

1. **Keep Terminal Open**: Watch for errors while developing
2. **Use Fast Refresh**: Most changes update automatically
3. **Check Logs**: Terminal shows helpful error messages
4. **Clear Cache**: When weird issues happen, clear cache
5. **Restart Server**: If Fast Refresh breaks, restart server

---

## 🎯 Most Common Commands

You'll use these 90% of the time:

```bash
# Start the app
npm start

# Install a package
npm install package-name

# Clear cache and restart
npm start -- --clear

# That's it! 
```

---

**Bookmark this file for quick reference!** 📌
