import { useLogin } from "./hooks/useAuthenticate";
import { useState } from "react";
import { Input } from "./components/Input";
import { InvalidData } from "./mod/InvalidData";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");
  const loginMutation = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(
      { username, password },
      {
        onSuccess: () => {
          setResult("Success");
        },
        onError: (error: any) => {
          console.error(
            "Login error:",
            error.response ?? error.message ?? error
          );
          setResult("Error");
        },
      }
    );
  };

  return (
    <>
      <h1>This is the login page</h1>
      {result === "Error" && (
        <InvalidData message="Wrong username or password" />
      )}
      <form onSubmit={handleSubmit}>
        <Input
          attribute="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          attribute="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log in</button>
      </form>
      <a href="/register">register</a>
    </>
  );
};
