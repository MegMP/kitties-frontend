// Import our custom hook (User type is used indirectly through the hook)
import { useUserData } from "./hooks";
import { AccountForm } from "./components";
import type { AccountAttribute } from "./components/AccountForm/AccountForm.types";

type AccountProps = {
  userId: number;
};

export const Account = ({ userId }: AccountProps) => {
  // Use our custom hook to fetch user data
  // This replaces the old useEffect + useState pattern with React Query
  // React Query gives us loading states, error handling, and caching for free!
  const { 
    data: user,        // The user data (undefined while loading)
    isLoading,         // Boolean: is the request currently in progress?
    error,             // Any error that occurred during the request
    refetch            // Function to manually refetch the data if needed
  } = useUserData(userId);

  // Handle form updates
  // This function is called after a successful form submission
  // The mutation hook already updates the cache, so we don't need to refetch
  const handleChangeValue = (value: string, attribute: AccountAttribute) => {
    // Log the change for debugging (remove in production)
    console.log(`Successfully updated ${attribute} to: ${value}`);
    
    // The cache is automatically updated by the mutation hook
    // No need to manually refetch - React Query handles this for us!
  };

  // Loading state - show this while data is being fetched
  // React Query makes handling loading states much cleaner
  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <p>Loading your account information...</p>
        {/* You could add a spinner component here */}
      </div>
    );
  }

  // Error state - show this if something went wrong
  // Good error handling improves user experience significantly
  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
        <h2>Oops! Something went wrong</h2>
        <p>We couldn't load your account information.</p>
        <button onClick={() => refetch()}>Try Again</button>
        {/* In development, you might want to show the actual error */}
        {process.env.NODE_ENV === 'development' && (
          <details style={{ marginTop: '1rem', textAlign: 'left' }}>
            <summary>Error Details (dev only)</summary>
            <pre>{error instanceof Error ? error.message : 'Unknown error'}</pre>
          </details>
        )}
      </div>
    );
  }

  // No data state - this shouldn't happen if API is working correctly
  if (!user) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <p>No account information found.</p>
        <button onClick={() => refetch()}>Refresh</button>
      </div>
    );
  }

  // Success state - render the account form when we have data
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
      <h1>Account Settings</h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        Update your personal information below. Changes are saved automatically.
      </p>

      {/* Each field gets its own form component */}
      {/* This pattern makes the code modular and reusable */}
      
      <div style={{ marginBottom: '1.5rem' }}>
        <strong>Username:</strong> {user.username}
        <AccountForm
          userId={userId}
          handleChangeValue={handleChangeValue}
          type="username"
          placeholder="Enter new username"
          required
        />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <strong>Email:</strong> {user.email}
        <AccountForm
          userId={userId}
          handleChangeValue={handleChangeValue}
          type="email"
          placeholder="Enter new email"
          required
        />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <strong>Password:</strong> ••••••••
        <AccountForm
          userId={userId}
          handleChangeValue={handleChangeValue}
          type="password"
          placeholder="Enter new password"
          required
        />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <strong>First Name:</strong> {user.firstname}
        <AccountForm
          userId={userId}
          handleChangeValue={handleChangeValue}
          type="firstname"
          placeholder="Enter first name"
          required
        />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <strong>Last Name:</strong> {user.lastname}
        <AccountForm
          userId={userId}
          handleChangeValue={handleChangeValue}
          type="lastname"
          placeholder="Enter last name"
          required
        />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <strong>City:</strong> {user.city || 'Not specified'}
        <AccountForm
          userId={userId}
          handleChangeValue={handleChangeValue}
          type="city"
          placeholder="Enter your city"
          required={false}
        />
      </div>

      {/* Refresh button for manual data refresh */}
      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <button 
          onClick={() => refetch()}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Refresh Account Data
        </button>
      </div>
    </div>
  );
};
