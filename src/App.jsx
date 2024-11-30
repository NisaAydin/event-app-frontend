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
import AddEventPage from "./Pages/AddEventPage/AddEventPage";
import MyEvents from "./Pages/MyEvents/MyEvents";
import UpdateEvent from "./Pages/UpdateEvent/UpdateEvent";
import ChatPage from "./Pages/ChatPage/ChatPage";

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
          <Route path="/add-event" element={<AddEventPage />} />
          <Route path="/my-events" element={<MyEvents />} />
          <Route path="/update-event/:id" element={<UpdateEvent />} />
          <Route path="/chat-list" element={<ChatPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
