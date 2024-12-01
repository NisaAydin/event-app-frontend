import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignInPage.css";
import Button from "../../Components/Button/Button";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

function SignInPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        formData,
        {
          withCredentials: true,
        }
      );

      console.log("Login successful: ", response.data);
      login(response.data.user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error: ", error.response?.data || error.message);
      setErrorMessage(error.response?.data?.error || "An error occurred.");
    }
  };

  return (
    <div className="signin-page">
      <h1 className="signin-title">Giriş Yap</h1>
      <form className="signin-form" onSubmit={handleSubmit}>
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
        {errorMessage && <p>{errorMessage}</p>}
        <Button text="Giriş Yap" variant="primary" type="submit" />
      </form>

      <div className="signin-links">
        <p>
          Şifrenizi mi unuttunuz?{" "}
          <Link to="/forgot-password" className="reset-link">
            Sıfırlayın
          </Link>
        </p>
        <p>
          Henüz bir hesabınız yok mu?{" "}
          <Link to="/signup" className="signup-link">
            Kayıt Ol
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignInPage;
