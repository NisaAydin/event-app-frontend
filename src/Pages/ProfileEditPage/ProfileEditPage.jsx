import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; // Toastify'i ekleyin
import "react-toastify/dist/ReactToastify.css";

function ProfileEditPage() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    location: "",
    email: "",
    birthDate: "",
    phoneNumber: "",
    username: "",
    profilePicture: null,
    interests: [], // Kullanıcının seçili ilgi alanları
  });

  const interestOptions = [
    "Spor ve Fitness",
    "Sanat ve Kültür",
    "Oyunlar",
    "Seyahat ve Doğa",
    "Sağlık ve Sağlıklı Yaşam",
    "Teknoloji",
  ];

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user/profile", {
          withCredentials: true,
        });

        const { Name, Surname, Location, Email, BirthDate, PhoneNumber, Username, interests } =
          response.data.data;

        setFormData({
          name: Name,
          surname: Surname,
          location: Location,
          email: Email,
          birthDate: new Date(BirthDate).toISOString().split("T")[0], // YYYY-MM-DD formatı
          phoneNumber: PhoneNumber,
          username: Username,
          profilePicture: null,
          interests: interests || [], // Kullanıcının mevcut ilgi alanları
        });
      } catch (error) {
        console.error("Error fetching profile: ", error.message);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePicture: e.target.files[0] });
  };

  const handleInterestChange = (interest) => {
    setFormData((prevData) => {
      const updatedInterests = prevData.interests.includes(interest)
        ? prevData.interests.filter((i) => i !== interest) // Seçimi kaldır
        : [...prevData.interests, interest]; // Seçimi ekle

      return { ...prevData, interests: updatedInterests };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("surname", formData.surname);
    data.append("location", formData.location);
    data.append("email", formData.email);
    data.append("birthDate", formData.birthDate);
    data.append("phoneNumber", formData.phoneNumber);
    data.append("username", formData.username);
    data.append("interests", JSON.stringify(formData.interests)); // İlgi alanlarını JSON olarak gönder

    if (formData.profilePicture) {
      data.append("profilePicture", formData.profilePicture);
    }

    try {
      await axios.put("http://localhost:3000/user/update-profile", data, {
        withCredentials: true,
      });
      toast.success("Güncelleme başarılı!.", {
        position: "top-right",
        autoClose: 3000, // 3 saniye sonra kapanır
      }); // Başarı mesajı
      setTimeout(() => {
        navigate("/profile"); // 3 saniye sonra yönlendir
      }, 3000);
    } catch (error) {
      console.error("Error updating profile: ", error.response?.data || error.message);
      toast.error("Kayıt sırasında hata oluştu. Lütfen tekrar deneyin.", {
        position: "top-right",
        autoClose: 3000, // 3 saniye sonra kapanır
      });
    }
  };

  return (
    <div>
      <ToastContainer /> {/* Toastify bileşeni */}
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Surname:
          <input
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Birth Date:
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Phone Number:
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Profile Picture:
          <input type="file" name="profilePicture" onChange={handleFileChange} />
        </label>
        <label>
          Interests:
          <div>
            {interestOptions.map((interest) => (
              <div key={interest}>
                <input
                  type="checkbox"
                  checked={formData.interests.includes(interest)}
                  onChange={() => handleInterestChange(interest)}
                />
                {interest}
              </div>
            ))}
          </div>
        </label>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default ProfileEditPage;
