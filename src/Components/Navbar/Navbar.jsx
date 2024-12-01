import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoPerson, IoNotificationsOutline } from "react-icons/io5";
import { FiMessageSquare } from "react-icons/fi";
import { FaMapMarkerAlt, FaUserClock } from "react-icons/fa";
import { RiUserStarLine } from "react-icons/ri";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import Button from "../Button/Button";
import "./Navbar.css";

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    const fetchProfilePicture = async () => {
      if (isAuthenticated) {
        try {
          const response = await axios.get(
            "http://localhost:3000/user/profile-picture",
            {
              withCredentials: true,
            }
          );
          setProfilePicture(response.data.profilePicture);
        } catch (error) {
          console.error(
            "Error fetching profile picture:",
            error.response?.data || error.message
          );
        }
      }
    };

    fetchProfilePicture();
  }, [isAuthenticated]);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/auth/logout",
        {},
        { withCredentials: true }
      );
      logout();
      navigate("/signin");
      setDropdownOpen(false);
    } catch (error) {
      console.error("Logout error:", error.response?.data || error.message);
      alert("An error occurred while logging out.");
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleProfileNavigation = () => {
    setDropdownOpen(false);
    navigate("/profile");
  };

  if (!isAuthenticated) {
    return (
      <nav className="navbar">
        <Link to="/" className="user-navbar-logo">
          <span className="logo-icon">🌟 </span>
          <span className="logo-text">
            Event<span className="highlight">Hub</span>
          </span>
        </Link>
        <ul className="navbar-menu">
          <li>
            <Link to="/">Ana Sayfa</Link>
          </li>
          <li>
            <Link to="/events">Etkinlikler</Link>
          </li>
          <li>
            <Link to="/review">Görüşler</Link>
          </li>
        </ul>
        <div className="navbar-login">
          <Link to="/signin">
            <Button text="Giriş Yap" variant="secondary" />
          </Link>
          <Link to="/signup">
            <Button text="Kayıt Ol" variant="primary" icon={<IoPerson />} />
          </Link>
        </div>
      </nav>
    );
  }

  return (
    <nav className="user-navbar">
      <div className="user-navbar-left">
        <Link to="/dashboard" className="user-navbar-logo">
          <span className="logo-icon">🌟 </span>
          <span className="logo-text">
            Event<span className="highlight">Hub</span>
          </span>
        </Link>
        <input
          type="text"
          className="user-navbar-search"
          placeholder="Search events..."
        />
      </div>
      <div className="user-navbar-right">
        <Link to={"/my-events"} className="user-navbar-link">
          Kendi Etkinliklerim
        </Link>
        <Link to={"/participated-events"} className="user-navbar-icon">
          <RiUserStarLine />
        </Link>
        <Link to="/maps" className="user-navbar-icon">
          <FaMapMarkerAlt />
        </Link>
        <Link to="/chat-list" className="user-navbar-icon">
          <FiMessageSquare />
        </Link>

        <div className="user-navbar-profile" onClick={toggleDropdown}>
          <img
            src={
              profilePicture
                ? `http://localhost:3000/${profilePicture}`
                : "/default-profile.png"
            }
            alt="User Avatar"
            className="user-avatar"
          />
        </div>
        {dropdownOpen && (
          <div className="dropdown-menu">
            <div className="dropdown-item" onClick={handleProfileNavigation}>
              Profilim
            </div>
            <div className="dropdown-item" onClick={handleLogout}>
              Çıkış Yap
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
