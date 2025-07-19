# Account Management App

A React + TypeScript application for managing user account information, built with modern patterns and best practices.

## 🚀 Key Technologies & Patterns

### React Query (@tanstack/react-query)
This app uses **React Query** for data fetching and state management. Here's why it's awesome for junior developers:

- **Automatic caching**: Fetched data is cached automatically
- **Loading states**: Built-in loading, error, and success states
- **Background refetching**: Keeps data fresh without user interaction
- **Optimistic updates**: UI updates immediately, syncs with server later

### Custom Hooks Pattern
We use custom hooks to encapsulate logic:
- `useUserData()` - Fetches user information
- `useUpdateUser()` - Handles user profile updates

This makes code reusable and easier to test!

## 📁 Project Structure

```
src/
├── page/
│   └── account/
│       ├── Account.tsx              # Main account page component
│       ├── hooks/                   # Custom React Query hooks
│       │   ├── useUserData.ts       # Hook for fetching user data
│       │   ├── useUpdateUser.ts     # Hook for updating user data
│       │   └── index.ts             # Export all hooks
│       └── components/
│           └── AccountForm/         # Reusable form component
│               ├── AccountForm.tsx
│               ├── AccountForm.types.ts
│               └── index.ts
├── App.tsx                          # Main app with routing
└── main.tsx                         # App entry point with React Query setup
```

## 🔄 How React Query Works Here

### 1. Data Fetching (useQuery)
```typescript
// In useUserData.ts
const { data, isLoading, error } = useQuery({
  queryKey: ['user', userId],      // Unique identifier for caching
  queryFn: () => fetchUserData(),  // Function that fetches data
  enabled: !!userId,               // Only run when userId exists
})
```

### 2. Data Mutations (useMutation)
```typescript
// In useUpdateUser.ts
const mutation = useMutation({
  mutationFn: updateUserAPI,         // Function that updates data
  onSuccess: () => {
    // Update cache automatically
    queryClient.setQueryData(['user', userId], newData)
  }
})
```

## 🎯 Key Improvements Made

### Before (Old Pattern)
```typescript
// ❌ Old way: useEffect + useState
const [user, setUser] = useState()
const [loading, setLoading] = useState(true)
const [error, setError] = useState()

useEffect(() => {
  setLoading(true)
  axios.get('/api/user')
    .then(data => setUser(data))
    .catch(err => setError(err))
    .finally(() => setLoading(false))
}, [])
```

### After (React Query)
```typescript
// ✅ New way: React Query
const { data: user, isLoading, error } = useUserData(userId)
// That's it! Loading, error, and caching handled automatically
```

### Benefits for Junior Developers:
1. **Less boilerplate code** - No manual loading/error state management
2. **Better user experience** - Automatic caching and background updates
3. **Easier debugging** - React Query DevTools show all network activity
4. **More predictable** - Consistent patterns across the app

## 🛠️ Development Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔧 Environment Variables

Create a `.env` file:
```
VITE_BACKEND_URL=http://localhost:8080
```

## 📚 Learning Resources for Junior Developers

### React Query Concepts:
- **Query Key**: Unique identifier for cached data
- **Query Function**: Async function that fetches data
- **Mutation**: Function that changes data on the server
- **Cache**: Temporary storage for fetched data
- **Stale Time**: How long data is considered "fresh"
- **GC Time**: How long unused data stays in cache

### Best Practices Used:
1. **Custom Hooks** - Encapsulate complex logic
2. **TypeScript** - Catch errors before runtime
3. **Error Boundaries** - Handle errors gracefully
4. **Loading States** - Show users what's happening
5. **Optimistic Updates** - Update UI immediately

## 🚦 Code Review Notes

### Why We Removed Other Pages:
- **Focus**: Simplified to account management only
- **Learning**: Easier to understand patterns with fewer files
- **Maintenance**: Less code = fewer bugs

### Why React Query Instead of useEffect:
- **Caching**: Automatic data caching across components
- **Synchronization**: Keeps UI in sync with server
- **Error Handling**: Built-in error states and retry logic
- **Performance**: Reduces unnecessary API calls

### Code Quality Improvements:
- **TypeScript**: Strong typing prevents runtime errors
- **Comments**: Extensive documentation for learning
- **Separation of Concerns**: Logic separated into custom hooks
- **Consistent Patterns**: Same approach for all data operations

## 🐛 Common Issues & Solutions

### API Not Working?
Check that `VITE_BACKEND_URL` is set correctly in your `.env` file.

### React Query DevTools
Install the browser extension to see query states, cache contents, and network activity.

### TypeScript Errors?
Make sure all types are imported correctly and match the API response structure.

---

**For Junior Developers**: This codebase demonstrates modern React patterns. Focus on understanding:
1. How React Query simplifies data fetching
2. How custom hooks make code reusable
3. How TypeScript prevents bugs
4. How proper error handling improves UX
