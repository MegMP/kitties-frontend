import { Navigate } from "react-router-dom";

export const Nav = () => {

  const logout = () => {
    localStorage.removeItem("token")
    return <Navigate to="/login"></Navigate>;
  }

  return (
    <>
      <a href="/user/account">account </a>
      <a href="/user/friends">friends </a>
      <a href="user/mailbox">mailbox </a>
      <button onClick={logout}>Log out</button>
    </>
  );
};
