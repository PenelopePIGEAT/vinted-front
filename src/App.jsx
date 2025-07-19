import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";
import Header from "./components/Header";
import Cookie from "js-cookie";
import { useState } from "react";

function App() {
  const [userToken, setUserToken] = useState(Cookie.get("userToken") || null);

  const handleToken = (token) => {
    if (token) {
      Cookie.set("userToken", token, { expires: 7 });
      setUserToken(token);
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
        <Route path="/offer/:id" element={<Offer token={userToken} />} />
        <Route path="/signup" element={<SignUp handleToken={handleToken} />} />
        <Route path="/login" element={<Login handleToken={handleToken} />} />
        <Route
          path="/publish"
          element={<Publish handleToken={handleToken} token={userToken} />}
        />
        <Route
          path="/payment"
          element={<Payment handleToken={handleToken} token={userToken} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
