import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
// React Query imports - this is a powerful library for managing server state
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App.tsx'

// Create a QueryClient instance
// This is the central hub for all your data fetching and caching
// Think of it as a smart cache that knows when to refetch data
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // How long data stays "fresh" before refetching (5 minutes)
      // This means if you visit the same page within 5 minutes, it won't refetch
      staleTime: 1000 * 60 * 5,
      
      // How long unused data stays in cache (10 minutes)  
      // After this time, unused data is garbage collected to save memory
      gcTime: 1000 * 60 * 10,
      
      // Retry failed requests 3 times before giving up
      // Helpful for network issues or temporary server problems
      retry: 3,
      
      // Don't refetch when user switches back to the browser tab
      // You can change this to true if you want always fresh data
      refetchOnWindowFocus: false,
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    {/* QueryClientProvider makes React Query available to all components */}
    {/* This must wrap your entire app for useQuery/useMutation to work */}
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </BrowserRouter>
)
