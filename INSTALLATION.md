# Installation Guide

## Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo Go app on your mobile device (or Android/iOS simulator)

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the app**
   ```bash
   npm start
   ```

3. **Run on device/simulator**
   - **Android**: Press `a` or scan QR with Expo Go app
   - **iOS**: Press `i` or scan QR with Camera app
   - **Web**: Press `w`

## Troubleshooting

### Module not found errors
```bash
npm install --legacy-peer-deps
```

### Clear cache
```bash
npm start -- --clear
```

### Reset project
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

## Development Tips

- Use `npm start` to start the development server
- Press `r` to reload the app
- Press `m` to toggle menu
- Use React Native Debugger or Chrome DevTools for debugging

## Building for Production

### Android
```bash
eas build --platform android
```

### iOS
```bash
eas build --platform ios
```

Note: You need to set up EAS (Expo Application Services) for production builds.
