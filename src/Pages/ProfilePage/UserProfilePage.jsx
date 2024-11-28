import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user/profile", {
          withCredentials: true, // Cookie'yi backend'e gönderir
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
    <div>
      <h1>Kullanıcı Profili</h1>
      <p><strong>Kullanıcı Adı:</strong> {profile.Username}</p>
      <p><strong>E-posta:</strong> {profile.Email}</p>
      <p><strong>Ad:</strong> {profile.Name}</p>
      <p><strong>Soyad:</strong> {profile.Surname}</p>
      <p><strong>Doğum Tarihi:</strong> {new Date(profile.BirthDate).toLocaleDateString()}</p>
      <p><strong>Telefon Numarası:</strong> {profile.PhoneNumber}</p>
      <p><strong>Lokasyon:</strong> {profile.Location}</p>
      <p><strong>İlgi alanları:</strong> {profile.interests.join(",")}</p>
      <img src={`http://localhost:3000/${profile.ProfilePicture}`} alt="Profile" />
      <Link to="/profile/edit">
        <button>Edit Profile</button>
      </Link>
    </div>
  );
}

export default ProfilePage;
