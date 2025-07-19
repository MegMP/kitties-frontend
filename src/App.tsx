import { Routes, Route } from "react-router-dom";
import "./App.css";
import axios from "axios";
// Only import Account since we removed other pages to focus on account management
import { Account } from "./page";

function App() {
  // Set the base URL for all axios requests
  // This way we don't need to write the full URL in every API call
  // The BACKEND_URL should be set in your .env file (e.g., VITE_BACKEND_URL=http://localhost:8080)
  axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
  
  return (
    <Routes>
      {/* Main route - redirects to account page */}
      {/* In a real app, you might want a landing page here */}
      <Route path="/" element={<Account userId={2} />} />
      
      {/* Account management page */}
      {/* userId is hardcoded for demo - in real app, get from authentication */}
      <Route path="/account" element={<Account userId={2} />} />
    </Routes>
  );
}

export default App;
