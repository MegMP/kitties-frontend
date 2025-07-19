import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

// Define the User type - this describes what a user object looks like
// Having clear types helps prevent bugs and makes code more readable
export type User = {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  city: string;
}

// Custom hook for fetching user data
// Custom hooks are a powerful React pattern - they let you reuse logic between components
// This hook encapsulates all the user fetching logic and can be used anywhere
export const useUserData = (userId: number) => {
  return useQuery({
    // Query key - this uniquely identifies this query
    // React Query uses this to cache and manage the data
    // When userId changes, it will automatically refetch
    queryKey: ['user', userId],
    
    // Query function - this is where the actual API call happens
    // It must return a Promise (axios.get returns a Promise)
    queryFn: async (): Promise<User> => {
      const response = await axios.get(`/api/v1/accounts`, {
        headers: {
          id: userId,
        },
      })
      return response.data
    },
    
    // Only run this query if userId exists and is valid
    // This prevents unnecessary API calls when userId is undefined or 0
    enabled: !!userId && userId > 0,
    
    // Show stale data while refetching in background
    // This gives users a better experience - they see old data immediately
    // while fresh data loads behind the scenes
    staleTime: 1000 * 60 * 2, // 2 minutes - after this, data is considered "stale"
  })
} 