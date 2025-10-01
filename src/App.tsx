import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { Home, Login, Register } from "./page";
import { Friends } from "./page/home/Friends";
import { Profile } from "./page/home/Profile";
import { Layout } from "./components/Layout";

function App() {
  axios.defaults.baseURL = import.meta.env.BACKEND_URL;
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="friends" element={<Friends />} />
        <Route path="mailbox" element={<></>} />
      </Route>
    </Routes>
  );
}

export default App;
