import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import type { AccountAttribute } from '../components/AccountForm/AccountForm.types'

// Define the mutation variables - what data we need to update a user field
type UpdateUserVariables = {
  userId: number
  attribute: AccountAttribute
  value: string
}

// Custom hook for updating user data
// useMutation is perfect for operations that change data on the server
// Unlike useQuery (for reading), useMutation is for creating, updating, deleting
export const useUpdateUser = () => {
  // Get access to the query client to update cached data
  // This lets us update the UI immediately after a successful mutation
  const queryClient = useQueryClient()

  return useMutation({
    // The mutation function - this does the actual API call
    // It receives the variables we pass when calling mutate()
    mutationFn: async ({ userId, attribute, value }: UpdateUserVariables) => {
      // Different endpoints for different fields (this could be improved with a single endpoint)
      const endpoint = `/api/v1/accounts/${attribute}`
      let payload: Record<string, string> = {}
      
      // Map the attribute to the correct payload field
      // This is a bit messy - ideally the API would have consistent naming
      switch (attribute) {
        case 'firstname':
          payload = { username: value } // Note: API expects 'username' for firstname (seems like a bug)
          break
        case 'username':
          payload = { username: value }
          break
        case 'password':
          payload = { password: value }
          break
        case 'email':
          payload = { email: value }
          break
        case 'lastname':
          payload = { lastname: value }
          break
        case 'city':
          payload = { city: value }
          break
        default:
          throw new Error(`Unknown attribute: ${attribute}`)
      }

      const response = await axios.patch(endpoint, payload, {
        headers: { id: userId }
      })
      
      return response.data
    },

    // onSuccess runs after a successful mutation
    // This is where we update the cached user data
    onSuccess: (_data, variables) => {
      // Update the user query cache with the new value
      // This makes the UI update immediately without refetching
      queryClient.setQueryData(['user', variables.userId], (oldData: unknown) => {
        if (!oldData || typeof oldData !== 'object') return oldData
        
        // Return the updated user object
        return {
          ...oldData as Record<string, unknown>,
          [variables.attribute]: variables.value
        }
      })

      // Optional: Show success message to user
      console.log(`Successfully updated ${variables.attribute}`)
    },

    // onError runs if the mutation fails
    // Good error handling is crucial for user experience
    onError: (error, variables) => {
      console.error(`Failed to update ${variables.attribute}:`, error)
      
      // In a real app, you might want to show a toast notification
      // or revert optimistic updates here
    }
  })
} 