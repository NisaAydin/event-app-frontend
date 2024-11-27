import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignInPage.css";
import Button from "../../Components/Button/Button";

function SignInPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign In Data Submitted: ", formData);
    // Backend'e kullanıcı adı ve şifre gönderilerek kimlik doğrulama yapılmalıdır
  };

  return (
    <div className="signin-page">
      <h1 className="signin-title">Sign In</h1>
      <form className="signin-form" onSubmit={handleSubmit}>
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
        <Button text="Sign In" variant="primary" type="submit" />
      </form>

      <div className="signin-links">
        <p>
          Forgot your password?{" "}
          <Link to="/reset-password" className="reset-link">
            Reset it here
          </Link>
        </p>
        <p>
          Don't have an account?{" "}
          <Link to="/signup" className="signup-link">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignInPage;
