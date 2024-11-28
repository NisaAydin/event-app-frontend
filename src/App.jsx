import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import EventsSection from "./Pages/EventsSection/EventsSection";
import ReviewSection from "./Pages/Review/ReviewSection";
import SignUpPage from "./Pages/SignUpPage/SignUpPage";
import HomePage from "./Pages/HomePage/HomePage";
import Signin from "./Pages/Sign In/SigninPage";
import UserProfilePage from "./Pages/ProfilePage/UserProfilePage";
import ProfileEditPage from "./Pages/ProfileEditPage/ProfileEditPage";
import ForgotPasswordPage from "./Pages/ForgetPasswordPage/ForgetPasswordPage";
import ResetPasswordPage from "./Pages/ResetPasswordPage/ResetPasswordPage";
import { AuthProvider } from "./context/AuthContext";
import Dashboard from "./Pages/Dashboard/Dashboard";
import EventDetail from "./Pages/EventDetail/EventDetail";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Ana Sayfa: HomePage */}
          <Route path="/" element={<HomePage />} />

          {/* Diğer Sayfalar */}
          <Route path="/events" element={<EventsSection />} />
          <Route path="/review" element={<ReviewSection />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/profile/edit" element={<ProfileEditPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/event-detail" element={<EventDetail />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
