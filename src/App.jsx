import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import HomeSection from "./Components/Home/HomeSection";
import EventsSection from "./Pages/EventsSection/EventsSection";
import ReviewSection from "./Pages/Review/ReviewSection";
import SignUpPage from "./Pages/SignUpPage/SignUpPage";
import HomePage from "./Pages/HomePage/HomePage";
import Signin from "./Pages/Sign In/SigninPage";

function App() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    fetch("http://localhost:3000/api/GetUsers")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Ana Sayfa: HomePage */}
        <Route path="/" element={<HomePage />} />

        {/* Diğer Sayfalar */}
        <Route path="/events" element={<EventsSection />} />
        <Route path="/reviews" element={<ReviewSection />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </Router>
  );
}

export default App;
