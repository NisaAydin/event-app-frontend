import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaBirthdayCake,
  FaStar,
} from "react-icons/fa"; // Puan ikonu için FaStar eklendi
import { IoPersonCircle } from "react-icons/io5";
import "./UserProfilePage.css";

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user/profile", {
          withCredentials: true,
        });
        setProfile(response.data.data);
      } catch (err) {
        setError(err.response?.data?.error || "An error occurred.");
      }
    };

    fetchProfile();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!profile) return <div>Loading...</div>;

  return (
    <div className="profile-page">
      <h1 className="profile-title">Kullanıcı Profili</h1>
      <img
        className="profile-picture"
        src={`http://localhost:3000/${profile.ProfilePicture}`}
        alt="Profile"
      />
      <div className="profile-info">
        <p>
          <IoPersonCircle className="profile-icon" />
          <strong>Kullanıcı Adı:</strong> {profile.Username}
        </p>
        <p>
          <FaEnvelope className="profile-icon" />
          <strong>E-posta:</strong> {profile.Email}
        </p>
        <p>
          <strong>Ad:</strong> {profile.Name}
        </p>
        <p>
          <strong>Soyad:</strong> {profile.Surname}
        </p>
        <p>
          <FaBirthdayCake className="profile-icon" />
          <strong>Doğum Tarihi:</strong>{" "}
          {new Date(profile.BirthDate).toLocaleDateString()}
        </p>
        <p>
          <FaPhone className="profile-icon" />
          <strong>Telefon Numarası:</strong> {profile.PhoneNumber}
        </p>
        <p>
          <FaMapMarkerAlt className="profile-icon" />
          <strong>Lokasyon:</strong> {profile.Location}
        </p>
        <p>
          <strong>İlgi alanları:</strong> {profile.interests.join(", ")}
        </p>
        <p>
          <FaStar className="profile-icon" />
          <strong>Toplam Puan:</strong> {profile.totalPoints}
        </p>
      </div>
      <Link to="/profile/edit">
        <button className="edit-button">Edit Profile</button>
      </Link>
    </div>
  );
}

export default ProfilePage;
