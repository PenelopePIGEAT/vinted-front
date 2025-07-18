import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Header from "./components/Header";
import Cookie from "js-cookie";

function App() {
  const handleToken = (token) => {
    if (token) {
      Cookie.setItem("userToken", token, { expires: 7 });
    } else {
      Cookie.remove("userToken");
    }
  };

  return (
    <Router>
      <Header handleToken={handleToken} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="/signup" element={<SignUp handleToken={handleToken} />} />
        <Route path="/login" element={<Login handleToken={handleToken} />} />
      </Routes>
    </Router>
  );
}

export default App;
