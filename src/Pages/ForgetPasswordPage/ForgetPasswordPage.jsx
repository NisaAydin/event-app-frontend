import { useState } from "react";
import axios from "axios";
import "./ForgetPasswordPage.css";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/forgot-password",
        { email }
      );
      setMessage(response.data.message);
    } catch (error) {
      setError(error.response?.data?.error || "An error occurred.");
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <h1 className="forgot-password-title">Şifremi Unuttum</h1>
        <p className="forgot-password-text">
          Şifre sıfırlama bağlantısını almak için e-posta adresinizi girin.
        </p>
        <form onSubmit={handleSubmit} className="forgot-password-form">
          <label htmlFor="email" className="forgot-password-label">
            E-posta Adresi:
          </label>
          <input
            type="email"
            id="email"
            className="forgot-password-input"
            value={email}
            onChange={handleInputChange}
            required
            placeholder="E-posta adresinizi girin"
          />
          <button type="submit" className="forgot-password-button">
            Sıfırlama Bağlantısını Gönder
          </button>
        </form>
        {message && <p className="forgot-password-success">{message}</p>}
        {error && <p className="forgot-password-error">{error}</p>}
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
