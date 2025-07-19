import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Publish from "./pages/Publish";
import Header from "./components/Header";
import Cookie from "js-cookie";
import { useState } from "react";

function App() {
  const [userToken, setUserToken] = useState(Cookie.get("userToken") || null);

  const handleToken = (token) => {
    if (token) {
      Cookie.set("userToken", token, { expires: 7 });
    } else {
      Cookie.remove("userToken");
      setUserToken(null);
    }
  };

  return (
    <Router>
      <Header handleToken={handleToken} userToken={userToken} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="/signup" element={<SignUp handleToken={handleToken} />} />
        <Route path="/login" element={<Login handleToken={handleToken} />} />
        <Route
          path="/publish"
          element={<Publish handleToken={handleToken} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
