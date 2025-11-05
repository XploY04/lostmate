# Features Documentation

## Detailed Feature Breakdown

### 🏠 Home Screen (`app/(tabs)/index.tsx`)

**What it does:**
- Displays all lost and found items
- Provides filtering and search capabilities
- Entry point for creating new posts

**Features:**
- **Segmented Buttons**: Filter between "All Items", "Lost", and "Found"
- **Search Bar**: Real-time search across title, category, location, and description
- **Item Cards**: Displays item image, title, category, location, date, and status
- **FAB Button**: Floating action button to create new posts
- **Empty States**: Shows helpful messages when no items match filters

**User Actions:**
- Tap item card → Navigate to item details
- Tap FAB (+) → Navigate to create screen
- Type in search bar → Filter results instantly
- Toggle type filter → Show only lost or found items

---

### 📄 Item Details Screen (`app/item/[id].tsx`)

**What it does:**
- Shows complete information about a specific item
- Allows claiming items or editing your own posts

**Features:**
- **Full Image Display**: Large banner image
- **Complete Details**: Title, category, description, location, date, contact
- **Status Badge**: Visual indicator (Lost/Found/Claimed)
- **Conditional Actions**:
  - **Your Posts**: Edit and Delete buttons
  - **Others' Posts**: Mark as Claimed button
  - **Claimed Items**: Read-only view

**User Actions:**
- **If your post**:
  - Tap "Edit Post" → Navigate to edit form
  - Tap "Delete" → Confirm and delete item
- **If someone else's post**:
  - Tap "Mark as Claimed" → Update status to claimed
- View contact info to reach the owner

**Validations:**
- Confirmation alerts before claiming or deleting
- Success/error messages for all actions
- Simulated async operations (500ms delay)

---

### ✏️ Create/Edit Screen (`app/create.tsx`)

**What it does:**
- Form to create new items or edit existing ones
- Includes validation and image upload

**Features:**
- **Type Selector**: Toggle between Lost and Found
- **Form Fields**:
  - Title (required, text input)
  - Category (required, dropdown menu)
  - Description (required, multiline, min 10 chars)
  - Location (required, text input)
  - Date (required, date string)
  - Contact (required, email/phone)
- **Image Picker**: Upload from camera roll with preview
- **Real-time Validation**: Shows errors as you type
- **Loading States**: Shows spinner during save

**User Actions:**
- Select item type with segmented buttons
- Fill in all required fields
- Tap category button → Open dropdown menu
- Tap image area → Open image picker
- Tap "Post Item" or "Update Item" → Save and return

**Validations:**
- All fields except date are required
- Description must be at least 10 characters
- Image must be selected
- Shows field-specific error messages
- Prevents submission if validation fails

**Edit Mode:**
- When opened with `?id=xxx` parameter
- Pre-fills form with existing item data
- Changes button text to "Update Item"
- Updates existing item instead of creating new

---

### 👤 Profile Screen (`app/(tabs)/profile.tsx`)

**What it does:**
- Displays user information and statistics
- Shows all posts created by the current user

**Features:**
- **User Info**: Avatar with initials, name, email
- **Statistics Cards**:
  - Total Posts: Count of all your items
  - Active: Items not yet claimed
  - Claimed: Items marked as claimed
- **Action Buttons**:
  - Edit Profile (mock)
  - Logout (mock)
- **My Posts List**: Scrollable list of your items

**User Actions:**
- Tap "Edit Profile" → Show coming soon alert
- Tap "Logout" → Show confirmation dialog
- Tap any item card → Navigate to item details
- View your posting history and status

---

## 🧩 Reusable Components

### ItemCard (`components/ItemCard.tsx`)
- Displays item summary in a card format
- Shows: image, title, category, location, date, status badge
- Tappable to navigate to details
- Color-coded status: Red (Lost), Green (Found), Gray (Claimed)

### SearchBar (`components/SearchBar.tsx`)
- Material Design search input
- Debounced search (instant filtering)
- Customizable placeholder

### FABButton (`components/FABButton.tsx`)
- Floating Action Button at bottom-right
- Blue background with white + icon
- Navigates to create screen

### EmptyState & LoadingState (`components/EmptyState.tsx`)
- Shows friendly messages when lists are empty
- Displays spinner and text during loading

---

## 🗂️ State Management (`context/ItemsContext.tsx`)

**What it provides:**
- Global state for all items
- CRUD operations with simulated async behavior
- Data persistence using AsyncStorage

**Available Functions:**

#### `addItem(item)`
- Creates a new item
- Generates unique ID
- Adds userId and active status
- Saves to AsyncStorage

#### `updateItem(id, updates)`
- Updates specific fields of an item
- Preserves other fields
- Saves to AsyncStorage

#### `deleteItem(id)`
- Removes item from state
- Updates AsyncStorage

#### `claimItem(id)`
- Changes status to 'claimed'
- Saves to AsyncStorage

#### `getItemById(id)`
- Returns single item or undefined

#### `getUserItems()`
- Returns array of current user's items

**All operations:**
- Have 500ms simulated delay
- Update state immediately after delay
- Trigger re-render of components
- Persist to AsyncStorage

---

## 💾 Data Persistence

**Using AsyncStorage:**
- Loads items on app startup
- Saves items whenever state changes
- Falls back to mock data if no saved data
- Key: `@lostmate_items`

**Data Flow:**
1. App loads → Check AsyncStorage
2. If found → Load saved items
3. If not found → Load mock data
4. Any change → Save to AsyncStorage
5. App restart → Load saved data

---

## 🎨 UI/UX Features

### Color Scheme
- Primary: `#2196F3` (Blue)
- Lost: `#F44336` (Red)
- Found: `#4CAF50` (Green)
- Claimed: `#9E9E9E` (Gray)
- Background: `#f5f5f5` (Light Gray)

### Responsive Design
- Works on all screen sizes
- Scrollable content
- Touch-friendly buttons
- Proper spacing and padding

### Feedback
- Toast messages for actions (via Alert)
- Loading indicators
- Error states
- Empty states
- Confirmation dialogs

---

## 🔒 Data Validation

### Client-Side Validation
- Required field checks
- Minimum length for description
- Email/phone format (basic)
- Image requirement

### User Permissions
- Can only edit/delete own posts
- Can claim others' posts
- Cannot claim own posts
- Cannot claim already-claimed items

---

## 🧪 Mock Data Features

**Sample Data Includes:**
- 8 pre-loaded items
- 3 items by current user
- 5 items by others
- Mix of lost/found items
- Various categories
- One claimed item example

**Mock User:**
- ID: user-1
- Name: John Doe
- Email: john.doe@example.com

**Use Cases Covered:**
- Viewing own posts
- Viewing others' posts
- Claimed items
- Different categories
- Various locations

---

## 📱 Navigation Flow

```
App Start
    ↓
Home Screen (Tab 1)
    ├─→ Item Details
    │       ├─→ Edit Form
    │       └─→ Delete (back to Home)
    └─→ Create Form → Save → Back to Home

Profile (Tab 2)
    └─→ Item Details (from My Posts)
```

**Navigation Features:**
- Tab bar always visible
- Back button on detail screens
- Modal presentation for create screen
- Proper header styling
- Tab icons and labels

---

This documentation covers all the main features of the LostMate app. Each feature is fully functional with proper error handling, validation, and user feedback!
