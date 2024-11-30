import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import "./ResetPasswordPage.css";

function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token"); // Tokeni URL'den al
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/reset-password",
        {
          token,
          newPassword,
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setError(error.response?.data?.error || "An error occurred.");
    }
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-card">
        <h1 className="reset-password-title">Şifreyi Sıfırla</h1>
        <form onSubmit={handleSubmit} className="reset-password-form">
          <label htmlFor="password" className="reset-password-label">
            Yeni Şifre:
          </label>
          <input
            type="password"
            id="password"
            className="reset-password-input"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            placeholder="Yeni şifrenizi girin"
          />
          <button type="submit" className="reset-password-button">
            Şifreyi Sıfırla
          </button>
        </form>
        {message && <p className="reset-password-message success">{message}</p>}
        {error && <p className="reset-password-message error">{error}</p>}
      </div>
    </div>
  );
}

export default ResetPasswordPage;
