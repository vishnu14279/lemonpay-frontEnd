import React, { useState,useEffect } from "react";
import { Input, Button, Checkbox, message } from "antd";
import axios from "axios";
import "./App.css";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";

    if (name === "email") {
      if (!value) error = "Email is required.";
      else if (!/\S+@\S+\.\S+/.test(value)) error = "Invalid email format.";
    }

    if (name === "password") {
      if (!value) error = "Password is required.";
      else if (value.length < 8) error = "Must be at least 8 characters.";
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleLogin = async () => {
    validateField("email", email);
    validateField("password", password);

    if (errors.email || errors.password || !email || !password) {
      message.error("Please fix the errors before submitting.");
      return;
    }

    try {
      const response = await axios.post(
        "https://lemonpay-backend.onrender.com/api/auth/login",
        { email, password }
      );
      if (response.status === 200) {
        message.success("Login successful!");
        const token = response.data.token;
        localStorage.setItem("token", token);
        navigate("/tasks");
      }
    } catch (error) {
      message.error(error.response?.data?.error || "Login failed");
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");
  }, [navigate]);

  return (
    <div className="login-container">
      <div className="ball top-right" />
      <div className="ball bottom-left" />

      <div className="left-section">
        <img src={'https://media-hosting.imagekit.io/2652a3bf9870422b/lemonpay%204.png?Expires=1838455555&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=s3t-kvxKfipjP2KVOZ2Ch1eV6vnffcc4xhVmkXFRV6F3vYHulzBII5PHotdy5vze8653Q1llrpgCHwx0NRs3vWwmKpvZclfAAuh6gFJkuJ~NEBym0xcQbAan-IrEb8MKUDxFs6OUGrWEsSEysApi9aIzmORmlHLYYjIb6L8qBp602dJLG05weHRIQCGTxBLrQh3z20PNa9oicoVG3v4MsZIyVSKyxzYVzthHXNCoTJzGx0~itM8FPpayztsLMNbnLBxe4ji5I2s9LhhoDqTlERTopmOjE2iM8DoSfa2lzR0~M5~b7RHeStwq6XQr~MFw4arJASEAHXN6XX-RYwJ9Ug__'} alt="Lemonpay Logo" className="mobile-logo" />
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
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            validateField("email", e.target.value);
          }}
        />
        {errors.email && (
          <div className="error-wrapper">
            <div className="error-message">{errors.email}</div>
          </div>
        )}
        <Input.Password
          className="styled-input"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            validateField("password", e.target.value);
          }}
          visibilityToggle
        />
        {errors.password && (
          <div className="error-wrapper">
            <div className="error-message">{errors.password}</div>
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "15px", color: "#fff" }}>
          <a
            href="#"
            style={{ color: "#ffcb00", textDecoration: "none" }}
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </a>
        </div>

        <Button className="styled-button" type="primary" onClick={handleLogin}>
          Sign In
        </Button>
      </div>
    </div>
  );
};

export default App;
