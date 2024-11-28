import "./Navbar.css";
import { IoPerson } from "react-icons/io5";
import Button from "../Button/Button";
import "../../App.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { useState, useEffect } from "react";

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    const fetchProfilePicture = async () => {
      if (isAuthenticated) {
        try {
          const response = await axios.get("http://localhost:3000/user/profile-picture", {
            withCredentials: true,
          });
          setProfilePicture(response.data.profilePicture);
        } catch (error) {
          console.error("Error fetching profile picture:", error.response?.data || error.message);
        }
      }
    };

    fetchProfilePicture();
  }, [isAuthenticated]);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/logout",
        {},
        { withCredentials: true }
      );

      console.log(response.data.message);
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

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span className="logo-icon">🌙 </span>
        <span className="logo-text">
          Event<span className="highlight">Hub</span>
        </span>
      </div>
      {isAuthenticated ? (
        <div className="navbar-login">
          <div className="profile-menu">
            <div
              className="profile-icon"
              onClick={toggleDropdown}
              style={{ cursor: "pointer" }}
            >
              <img
                src={
                  profilePicture
                    ? `http://localhost:3000/${profilePicture}`
                    : "/default-profile.png"
                }
                alt="Profile"
                className="profile-picture"
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
        </div>
      ) : (
        <div className="navbar-login">
          <Link to="/signin">
            <Button text="Sign In" variant="secondary" />
          </Link>
          <Link to="/signup">
            <Button text="Sign Up" variant="primary" icon={<IoPerson />} />
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
