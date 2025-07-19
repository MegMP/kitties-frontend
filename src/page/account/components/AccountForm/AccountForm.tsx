import { useForm } from "react-hook-form";
// Import our custom mutation hook
import { useUpdateUser } from "../../hooks";
import type { AccountFormProps, FormData } from "./AccountForm.types";

export const AccountForm = ({
  userId,
  handleChangeValue,
  type,
  placeholder,
  required,
}: AccountFormProps) => {
  // React Hook Form for form handling
  // This gives us form validation, error handling, and clean form state management
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<FormData>();

  // Use our custom mutation hook for updating user data
  // This replaces the manual axios calls with React Query's powerful mutation system
  const updateUserMutation = useUpdateUser();

  const onSubmit = async (data: FormData) => {
    try {
      // Call the mutation with our form data
      // React Query will handle the API call, caching, and error states
      await updateUserMutation.mutateAsync({
        userId,
        attribute: type,
        value: data.value
      });

      // Notify parent component about the change
      // This triggers any necessary UI updates in the parent
      handleChangeValue(data.value, type);

      // Clear the form after successful submission
      // This provides good user feedback that the action completed
      reset();

    } catch (error) {
      // Error handling is already done in the mutation hook
      // But we could add form-specific error handling here if needed
      console.error('Form submission failed:', error);
    }
  };

  return (
    <div style={{ marginTop: '0.5rem' }}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <input
          // Use password type for password fields, text for everything else
          type={type === "password" ? "password" : "text"}
          // Register the input with React Hook Form
          // This connects the input to the form state and validation
          {...register("value", { 
            required: required ? `${type} is required` : false,
            minLength: type === 'password' ? { value: 6, message: 'Password must be at least 6 characters' } : undefined
          })}
          placeholder={placeholder}
          style={{
            padding: '0.5rem',
            border: '1px solid #ccc',
            borderRadius: '4px',
            flex: 1
          }}
          // Disable input while mutation is in progress
          disabled={updateUserMutation.isPending || isSubmitting}
        />
        
        <button 
          type="submit"
          // Disable button while form is submitting or mutation is in progress
          disabled={updateUserMutation.isPending || isSubmitting}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: updateUserMutation.isPending ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: updateUserMutation.isPending ? 'not-allowed' : 'pointer',
            minWidth: '80px'
          }}
        >
          {/* Show different text based on mutation state */}
          {updateUserMutation.isPending ? 'Saving...' : 'Update'}
        </button>
      </form>

      {/* Show success message */}
      {updateUserMutation.isSuccess && (
        <p style={{ color: 'green', fontSize: '0.875rem', marginTop: '0.25rem' }}>
          ✓ {type.charAt(0).toUpperCase() + type.slice(1)} updated successfully!
        </p>
      )}

      {/* Show error message if mutation failed */}
      {updateUserMutation.isError && (
        <p style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}>
          ✗ Failed to update {type}. Please try again.
          {/* In development, show detailed error */}
          {process.env.NODE_ENV === 'development' && (
            <details style={{ marginTop: '0.25rem' }}>
              <summary>Error details (dev only)</summary>
              <pre style={{ fontSize: '0.75rem', whiteSpace: 'pre-wrap' }}>
                {updateUserMutation.error instanceof Error 
                  ? updateUserMutation.error.message 
                  : 'Unknown error'}
              </pre>
            </details>
          )}
        </p>
      )}
    </div>
  );
};
