import { AccountForm } from "./components";
import { useUserData } from "./hooks/useUserData";

type idType = {
  userId: number;
};

export const Account = ({ userId }: idType) => {
  const { data, isLoading, error, refetch } = useUserData(userId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>This is the account page</h1>
      <p>Username: {data.username} </p>
      <AccountForm
        userId={userId}
        type="username"
        placeholder="New username"
        required
      />

      <p>Email: {data.email}</p>
      <AccountForm
        userId={userId}
        type="email"
        placeholder="New email"
        required
      />

      <p>Password: {data.password}</p>
      <AccountForm
        userId={userId}
        type="password"
        placeholder="New password"
        required
      />

      <p>Firstname: {data.firstname}</p>
      <AccountForm
        userId={userId}
        type="firstname"
        placeholder="New firstname"
        required
      />

      <p>Lastname: {data.lastname}</p>
      <AccountForm
        userId={userId}
        type="lastname"
        placeholder="New lastname"
        required
      />

      <p>City: {data.city}</p>
      <AccountForm
        userId={userId}
        type="city"
        placeholder="New city"
        required
      />
      <a href="/">home</a>
    </>
  );
};
