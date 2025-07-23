import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { Home, Account, Login, Register } from "./page";

function App() {
  axios.defaults.baseURL = import.meta.env.BACKEND_URL;
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/accounts" element={<Account userId={1} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
