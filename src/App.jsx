import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import EventsSection from "./Pages/EventsSection/EventsSection";
import ReviewSection from "./Pages/Review/ReviewSection";
import SignUpPage from "./Pages/SignUpPage/SignUpPage";
import HomePage from "./Pages/HomePage/HomePage";
import Signin from "./Pages/Sign In/SigninPage";

function App() {
  
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
