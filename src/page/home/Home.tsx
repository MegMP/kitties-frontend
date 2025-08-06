import { Nav } from "../../components/Nav";
import { useUserData } from "./hooks/useUserData";
import { Navigate } from "react-router-dom";

export const Home = () => {
  const { data, isLoading, error } = useUserData();
  console.log(error);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error?.response?.status === 403) {
    return <Navigate to="/login"></Navigate>;
  }
  if (error) {
    console.log(error?.response);
    return <p>Sorry, something went wrong</p>;
  }

  return (
    <>
    <Nav></Nav>
      <h1>This is the home page</h1>
      <h3>Hi {data?.username}, welcome to our page</h3>
    </>
  );
};
