// import React from "react";
// import { Input, Button, Checkbox } from "antd";
// import styled from "styled-components";
// import backgroundImage from "./assets/Lemonpay 4.png"; // Update path if needed

// // const LoginContainer = styled.div`
// //   position: relative;
// //    width: 100%;   /* Full width */
// //   height: 100vh; /* Full height */
// //   display: flex;
// //   justify-content: space-between;
// //   align-items: center;
// //   padding: 0 8%;
// //   overflow: hidden;
// //   background: linear-gradient(151.08deg, #FFFFFF 20.71%, #183BA3 66.01%),
// //               url(${''}) no-repeat center center/cover;
// //   background-blend-mode: lighten;
// // `;

// const LoginContainer = styled.div`
//   position: relative;
//    width: 100%;   /* Full width */
//   height: 100vh; /* Full height */
//   display: flex;
//   gap: 200px;
//   align-items: center;
//   overflow: hidden;
//   background: linear-gradient(151.08deg, #FFFFFF 20.71%, #183BA3 66.01%),
//               url(${''}) no-repeat center center/cover;
//   background-blend-mode: lighten;
// `;
// const LeftSection = styled.div`
//   color: white;
//   max-width: 40%;
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   justify-content: center; /* Vertically center */
//   align-items: center;     /* Horizontally center */

//   h1 {
//     font-size: 2.5rem;
//     font-weight: bold;
//     margin-bottom: 10px;
//     text-align: center;
//   }

//   span {
//     color: #ffcb00;
//     font-weight: bold;
//   }

//   img {
//     max-width: 200px;
//     margin-bottom: 20px;
//   }
// `;


// const RightSection = styled.div`
//   backdrop-filter: blur(10px);
//   padding: 30px;
//   border-radius: 12px;
//   width: 380px;
//   text-align: center;
//   color: white;
// `;

// const StyledInput = styled(Input)`
//   margin-bottom: 15px;
//   height: 45px;
//   border-radius: 5px;
//   background: rgba(255, 255, 255, 0.3);
//   border: none;
//   color: white;

//   &::placeholder {
//     color: rgba(255, 255, 255, 0.8);
//   }
// `;

// const StyledButton = styled(Button)`
//   width: 100%;
//   height: 45px;
//   background:white;
//   color: black;
//   font-size: 16px;
//   border: none;
//   border-radius: 5px;

//   &:hover {
//     background: #24389d;
//   }
// `;

// const Ball = styled.div`
//   position: absolute;
//   background: rgba(255, 255, 255, 0.2);
//   border-radius: 50%;
//   filter: blur(5px);

//   &.top-right {
//     width: 120px;
//     height: 120px;
//     top: 10px;
//     right: 50px;
//   }

//   &.bottom-left {
//     width: 180px;
//     height: 180px;
//     bottom: 40px;
//     left: 30px;
//   }
// `;

// const App = () => {
//   return (
//     <LoginContainer>
//       {/* Decorative Balls */}
//       <Ball className="top-right" />
//       <Ball className="bottom-left" />

//       {/* Left Side */}
//       <LeftSection>
//       <img src={backgroundImage} alt="Lemonpay Logo" />
//         <h1>
//           Join 8 Million Businesses <br />
//           <span>Powering Growth with Lemonpay!</span>
//         </h1>
//       </LeftSection>

//       {/* Right Side (Form Section) */}
//       <RightSection>
//         <h2>Welcome Login System</h2>
//         <p>Your gateway to seamless transactions and easy payments.</p>

//         <StyledInput placeholder="Email" type="email" />
//         <StyledInput placeholder="Password" type="password" />

//         <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px", color: "#fff" }}>
//           <Checkbox style={{ color: "white" }}>Remember me</Checkbox>
//           <a href="#" style={{ color: "#ffcb00", textDecoration: "none" }}>Sign Up</a>
//         </div>

//         <StyledButton type="primary">Sign In</StyledButton>
//       </RightSection>
//     </LoginContainer>
//   );
// };

// export default App;
import React from "react";
import { Input, Button, Checkbox } from "antd";
import "./App.css";
import backgroundImage from "./assets/Lemonpay 4.png";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/signup"); // navigate to signup page on button click
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
        <Input className="styled-input" placeholder="Password" type="password" />

        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px", color: "#fff" }}>
          <Checkbox style={{ color: "white" }}>Remember me</Checkbox>
          <a href="#" style={{ color: "#ffcb00", textDecoration: "none" }} onClick={handleSignIn}>Sign Up</a>
        </div>

        <Button className="styled-button" type="primary">Sign In</Button>
      </div>
    </div>
  );
};

export default App;
