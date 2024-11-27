import React, { useState } from "react";
import "./SignUpPage.css";
import Button from "../../Components/Button/Button";
import { Link } from "react-router-dom"; // Link'i ekleyin
import axios from "axios"; // Axios'u import edin

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
  const interestOptions = [
    "Music",
    "Sports",
    "Art and Culture",
    "Technology",
    "Travel",
    "Gaming",
    "Cooking",
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
      // Profile Picture dahil FormData oluşturun
      const data = new FormData();
      data.append("username", formData.username);
      data.append("password", formData.password);
      data.append("firstName", formData.firstName);
      data.append("lastName", formData.lastName);
      data.append("birthDate", formData.birthDate);
      data.append("gender", formData.gender);
      data.append("email", formData.email);
      data.append("phoneNumber", formData.phoneNumber);
      data.append("interests", JSON.stringify(formData.interests));
      if (formData.profilePicture) {
        data.append("profilePicture", formData.profilePicture);
      }

      // Backend'e POST isteği gönderin
      const response = await axios.post(
        "http://localhost:5000/api/signup",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // Başarılı yanıt alındığında kullanıcıyı bilgilendirin
      console.log("Kayıt Başarılı:", response.data);
      alert("Registration successful!");
    } catch (error) {
      console.error("Kayıt sırasında hata oluştu:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="signup-page">
      <h1 className="signup-title">Sign Up</h1>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
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
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
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
            <label>Birth Date</label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              required
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
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
          <label>Interests</label>
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
          <label>Profile Picture</label>
          <input
            type="file"
            name="profilePicture"
            onChange={handleFileChange}
            accept="image/*"
            required
          />
        </div>
        <Button text="Sign Up" variant="primary" type="submit" />{" "}
        {/* Button bileşeni burada kullanıldı */}
      </form>
      <p className="login-redirect">
        Already a member?{" "}
        <Link to="/signin" className="login-link">
          Sign in here
        </Link>
      </p>
    </div>
  );
}

export default SignUpPage;
