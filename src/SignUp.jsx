import React from "react";
import { Input, Button, Checkbox } from "antd";
import "./App.css";
import backgroundImage from "./assets/Lemonpay 4.png";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/"); // navigate to signup page on button click
  };
  return (
    <div className="login-container">
      {/* Decorative Balls */}
      <div className="ball top-right" />
      <div className="ball bottom-left" />

      {/* Left Section */}
      <div className="left-section">
        <img src={backgroundImage} alt="Lemonpay Logo" className=".mobile-logo" />
        <h1 className="title">
          <span style={{ color: 'white' }}>Join 8 Million Businesses</span> <br />
          <span>Powering Growth with</span> <br />
          <span style={{ color: 'white' }}>Lemonpay!</span>
        </h1>
      </div>

      {/* Right Section */}
      <div className="right-section">
        <h2>Welcome Login System</h2>
        <p>Your gateway to seamless transactions and easy payments.</p>

        <Input className="styled-input" placeholder="Email" type="email" />
        <Input className="styled-input" placeholder="Min 8 Characters" type="password" />
        <Input className="styled-input" placeholder="Min 8 Characters" type="password" />


        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px", color: "#fff" }}>
          <Checkbox style={{ color: "white" }}>Remember me</Checkbox>
          <a href="#" style={{ color: "#ffcb00", textDecoration: "none" }} onClick={handleSignIn}>Sign In</a>
        </div>

        <Button className="styled-button" type="primary">Sign Up</Button>
      </div>
    </div>
  );
};

export default SignUp;
