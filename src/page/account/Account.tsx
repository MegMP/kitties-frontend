import axios from "axios";
import { useEffect, useState } from "react";
import { AccountForm } from "./components";
import type { AccountAttribute } from "./components/AccountForm/AccountForm.types";

type idType = {
  userId: number;
};

type User = {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  city: string;
};

export const Account = ({ userId }: idType) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    axios
      .get(`/api/v1/accounts`, {
        headers: {
          id: userId,
        },
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err));
  }, [userId]);

  const handleChangeValue = (value: string, attribute: AccountAttribute) => {
    setUser((prev) => (prev ? { ...prev, [attribute]: value } : undefined));
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>This is the account page</h1>
      <p>Username: {user.username} </p>
      <AccountForm
        userId={userId}
        handleChangeValue={handleChangeValue}
        type="username"
        placeholder="New username"
        required
      />

      <p>Email: {user.email}</p>
      <AccountForm
        userId={userId}
        handleChangeValue={handleChangeValue}
        type="email"
        placeholder="New email"
        required
      />

      <p>Password: {user.password}</p>
      <AccountForm
        userId={userId}
        handleChangeValue={handleChangeValue}
        type="password"
        placeholder="New password"
        required
      />

      <p>Firstname: {user.firstname}</p>
      <AccountForm
        userId={userId}
        handleChangeValue={handleChangeValue}
        type="firstname"
        placeholder="New firstname"
        required
      />

      <p>Lastname: {user.lastname}</p>
      <AccountForm
        userId={userId}
        handleChangeValue={handleChangeValue}
        type="lastname"
        placeholder="New lastname"
        required
      />

      <p>City: {user.city}</p>
      <AccountForm
        userId={userId}
        handleChangeValue={handleChangeValue}
        type="city"
        placeholder="New city"
        required
      />
      <a href="/">home</a>
    </>
  );
};
