# LostMate - Lost & Found Mobile App

A complete **React Native Expo** mobile application for managing lost and found items. Built with **TypeScript**, **Expo Router**, and **React Native Paper**.

## 🎯 Features

- ✅ **Post Lost/Found Items** - Create posts with images, descriptions, and location
- 🔍 **Search & Filter** - Search by title, category, or location with type filters
- 📱 **Item Details** - View full item information with contact details
- ✏️ **Edit & Delete** - Manage your own posts
- ✓ **Claim Items** - Mark items as claimed
- 👤 **User Profile** - View your posts and stats
- 💾 **Persistent Storage** - Data saved locally using AsyncStorage
- 🎨 **Beautiful UI** - Clean, modern design with Material Design components

## 🛠️ Tech Stack

- **React Native** with **Expo**
- **TypeScript** for type safety
- **Expo Router** for file-based navigation
- **React Native Paper** for UI components
- **Context API** for state management
- **AsyncStorage** for local data persistence
- **Expo Image Picker** for image uploads

## 📦 Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd /home/xploy04/Documents/lostmate
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on your device**
   - Scan the QR code with the Expo Go app (Android) or Camera app (iOS)
   - Or press `a` for Android emulator or `i` for iOS simulator

## 📱 App Structure

```
/lostmate
├── app/
│   ├── _layout.tsx              # Root layout with providers
│   ├── (tabs)/
│   │   ├── _layout.tsx          # Tab navigation layout
│   │   ├── index.tsx            # Home screen (Lost/Found items)
│   │   └── profile.tsx          # Profile screen
│   ├── item/
│   │   └── [id].tsx             # Item details (dynamic route)
│   └── create.tsx               # Create/Edit item screen
│
├── components/
│   ├── ItemCard.tsx             # Item card component
│   ├── SearchBar.tsx            # Search bar component
│   ├── FABButton.tsx            # Floating action button
│   └── EmptyState.tsx           # Empty state component
│
├── context/
│   └── ItemsContext.tsx         # Global state management
│
├── data/
│   └── mockData.ts              # Mock data for items
│
├── types/
│   └── index.ts                 # TypeScript interfaces
│
└── assets/                      # Images and icons
```

## 🎮 How to Use

### Home Screen
- View all lost and found items
- Filter by "All Items", "Lost", or "Found"
- Search by title, category, or location
- Tap the **+** button to create a new post
- Tap any item card to view details

### Create/Edit Post
- Select item type (Lost or Found)
- Fill in item details (title, category, description, location, date, contact)
- Upload an item photo
- Submit to create or update the post

### Item Details
- View complete item information
- **If it's your post**: Edit or delete it
- **If it's someone else's post**: Mark as claimed
- Contact the owner using provided contact info

### Profile
- View your user information
- See statistics (total posts, active, claimed)
- Browse all your posts
- Edit profile or logout (mock actions)

## 🎨 Categories

- Electronics
- ID Card
- Wallet
- Keys
- Clothing
- Books
- Jewelry
- Other

## 💡 Features Details

### State Management
- Uses React Context API for global state
- Simulates async operations with delays
- Persists data using AsyncStorage

### Navigation
- File-based routing with Expo Router
- Tab navigation (Home, Profile)
- Stack navigation for details and create screens
- Modal presentation for create screen

### UI Components
- Material Design with React Native Paper
- Responsive and accessible
- Custom color scheme (Blue primary)
- Smooth animations and transitions

## 🚀 Future Enhancements

- [ ] Push notifications for new matches
- [ ] Image compression and optimization
- [ ] Location picker with maps
- [ ] Chat/messaging system
- [ ] Admin moderation panel
- [ ] Backend integration
- [ ] User authentication
- [ ] Social sharing

## 📝 Notes

- This is a **frontend-only** app with **mock data**
- No backend or API required
- Data is stored locally and persists between sessions
- All images are from Unsplash (placeholder URLs)
- On first run, the app loads with sample data

## 🔧 Development

### Mock Data
Edit `data/mockData.ts` to modify sample items and categories.

### Theming
Customize colors in the layout files and component styles.

### Add Features
The app structure is modular - easily extend with new screens and features.

## 📄 License

This project is open source and available for educational purposes.

## 👤 Author

Built with ❤️ for students and communities who need a simple Lost & Found solution.

---

**Enjoy using LostMate! 🎉**
