import { useState } from "react";
import "./SignUpPage.css";
import Button from "../../Components/Button/Button";
import { Link, useNavigate } from "react-router-dom"; // Link'i ekleyin
import axios from "axios"; // Axios'u import edin
import { ToastContainer, toast } from "react-toastify"; // Toastify'i ekleyin
import "react-toastify/dist/ReactToastify.css"; // Toastify CSS'i ekleyin

function SignUpPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "",
    email: "",
    phoneNumber: "",
    interests: [], // Çoklu seçim için bir array
    profilePicture: null,
  });

  const navigate = useNavigate();

  const interestOptions = [
    "Spor ve Fitness",
    "Sanat ve Kültür",
    "Oyunlar",
    "Seyahat ve Doğa",
    "Sağlık ve Sağlıklı Yaşam",
    "Teknoloji",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePicture: e.target.files[0] });
  };

  const handleInterestChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    setFormData((prevData) => {
      const updatedInterests = isChecked
        ? [...prevData.interests, value] // Eğer seçiliyse ekle
        : prevData.interests.filter((interest) => interest !== value); // Eğer seçimi kaldırılmışsa çıkar

      return { ...prevData, interests: updatedInterests };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("username", formData.username);
      data.append("password", formData.password);
      data.append("name", formData.firstName);
      data.append("surname", formData.lastName);
      data.append("birthDate", formData.birthDate);
      data.append("gender", formData.gender);
      data.append("email", formData.email);
      data.append("phoneNumber", formData.phoneNumber);
      data.append("location", formData.location);
      data.append("interests", JSON.stringify(formData.interests));

      if (formData.profilePicture) {
        data.append("profilePicture", formData.profilePicture);
      }

      const response = await axios.post(
        "http://localhost:3000/auth/register",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success("Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz.", {
        position: "top-right",
        autoClose: 3000, // 3 saniye sonra kapanır
      });

      setTimeout(() => {
        navigate("/signin"); // 3 saniye sonra yönlendir
      }, 3000);
      console.log("Kayıt Başarılı:", response.data);
    } catch (error) {
      toast.error("Kayıt sırasında hata oluştu. Lütfen tekrar deneyin.", {
        position: "top-right",
        autoClose: 3000, // 3 saniye sonra kapanır
      });

      console.error("Kayıt sırasında hata oluştu:", error);
    }
  };

  return (
    <div className="signup-page">
      <ToastContainer />
      <h1 className="signup-title">Kayıt Ol</h1>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Adınız</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Soyadınız</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Kullanıcı Adı</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Şifre</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Doğum Tarihi</label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Cinsiyet</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              required
            >
              <option value="">Seçiniz</option>
              <option value="Erkek">Erkek</option>
              <option value="Kadın">Kadın</option>
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>E-posta</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Telefon Numarası</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label>Yaşanılan Yer</label>
          <input
            type="text"
            name="location" // 'location' anahtarı ile formData'da tutulacak
            value={formData.location}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>İlgi Alanları</label>
          <div className="interest-options">
            {interestOptions.map((interest, index) => (
              <div key={index} className="interest-option">
                <input
                  type="checkbox"
                  value={interest}
                  onChange={handleInterestChange}
                />
                <label>{interest}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label>Profil Fotoğrafı</label>
          <input
            type="file"
            name="profilePicture"
            onChange={handleFileChange}
            accept="image/*"
            required
          />
        </div>
        <Button text="Kayıt Ol" variant="primary" type="submit" />
      </form>
      <p className="login-redirect">
        Zaten üye misiniz ?{" "}
        <Link to="/signin" className="login-link">
          Giriş yapın
        </Link>
      </p>
    </div>
  );
}

export default SignUpPage;
