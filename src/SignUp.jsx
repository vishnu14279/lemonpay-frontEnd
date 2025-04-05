import React, { useState } from "react";
import { Input, Button, Checkbox, message } from "antd";
import axios from "axios";
import "./App.css";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);


  const validateField = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // returns true if no errors
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    validateField(name, value);

  };
  const handleSignUp = async () => {
    if (!validateField()) return;

    try {
      setLoading(true);
      const response = await axios.post("https://lemonpay-backend.onrender.com/api/auth/register", {
        email: formData.email,
        password: formData.password,
      });
      if (response.status === 201) {
        message.success("Registration successful!");
        navigate("/"); // Redirect to login or homepage
      }
    } catch (error) {
      console.error(error);
      message.error(
        error.response?.data?.message || "Registration failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = () => {
    navigate("/");
  };

  return (
    <div className="login-container">
      <div className="ball top-right" />
      <div className="ball bottom-left" />

      <div className="left-section">
        <img src={'https://media-hosting.imagekit.io/2652a3bf9870422b/lemonpay%204.png?Expires=1838455555&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=s3t-kvxKfipjP2KVOZ2Ch1eV6vnffcc4xhVmkXFRV6F3vYHulzBII5PHotdy5vze8653Q1llrpgCHwx0NRs3vWwmKpvZclfAAuh6gFJkuJ~NEBym0xcQbAan-IrEb8MKUDxFs6OUGrWEsSEysApi9aIzmORmlHLYYjIb6L8qBp602dJLG05weHRIQCGTxBLrQh3z20PNa9oicoVG3v4MsZIyVSKyxzYVzthHXNCoTJzGx0~itM8FPpayztsLMNbnLBxe4ji5I2s9LhhoDqTlERTopmOjE2iM8DoSfa2lzR0~M5~b7RHeStwq6XQr~MFw4arJASEAHXN6XX-RYwJ9Ug__'} alt="Lemonpay Logo" className=".mobile-logo" />
        <h1 className="title1">
          <span style={{ color: 'white' }}>Join 8 Million Businesses</span> <br />
          <span>Powering Growth with</span> <br />
          <span style={{ color: 'white' }}>Lemonpay!</span>
        </h1>
      </div>

      <div className="right-section">
        <h2>Welcome Login System</h2>
        <p>Your gateway to seamless transactions and easy payments.</p>

        <Input
          className="styled-input"
          placeholder="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && (
          <div className="error-wrapper">
            <div className="error-message">{errors.email}</div>
          </div>
        )}


        <Input.Password
          className="styled-input"
          placeholder="Min 8 Characters"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && (
          <div className="error-wrapper">
            <div className="error-message">{errors.password}</div>
          </div>
        )}

        <Input.Password
          className="styled-input"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && (
          <div className="error-wrapper">
            <div className="error-message">{errors.confirmPassword}</div>
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "15px", color: "#fff" }}>
          <a href="#" style={{ color: "#ffcb00", textDecoration: "none" }} onClick={handleSignIn}>Sign In</a>
        </div>

        <Button
          className="styled-button"
          type="primary"
          loading={loading}
          onClick={handleSignUp}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default SignUp;
