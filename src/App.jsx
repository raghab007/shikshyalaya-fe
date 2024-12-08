import { BrowserRouter, Link, Route, Routes, useLocation } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import { Button, TextField } from "@mui/material";
import Course from "./pages/Course";
import Footer from "./pages/Footer";
import { useState } from "react";
import Logo from "./assets/logo2.png"; // Assuming the logo image is saved here
import DashboardLayoutBasic from "./pages/Admin";
import CourseDetails from "./pages/CourseDetails";
import ForgotPassword from "./pages/Forgetpassword";
import "./App.css";

function Navbar() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 50px",
        backgroundColor: "#e3f2fd",
      }}
    >
      {/* Logo and Title */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={Logo}
          alt="Sikshyalaya Logo"
          style={{
            width: "60px",
            height: "60px",
            marginRight: "15px",
            transition: "transform 0.3s ease-in-out",
            borderRadius: "15px",
          }}
          onMouseOver={(e) => {
            e.target.style.transform = "scale(1.1)";
          }}
          onMouseOut={(e) => {
            e.target.style.transform = "scale(1)";
          }}
        />
        <h1
          style={{
            color: "#1976d2",
            fontSize: "2rem",
            fontWeight: "bold",
            margin: 0,
            letterSpacing: "1px",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
          }}
        >
          <Link to={"/"} style={{ textDecoration: "none", color: "#1976d2" }}>
            Sikshyalaya
          </Link>
        </h1>
      </div>

      {/* Search Bar */}
      <div style={{ width: "65%", display: "flex", justifyContent: "center" }}>
        <TextField
          variant="standard"
          placeholder="Search courses"
          type="search"
          InputProps={{
            style: {
              backgroundColor: "white",
              borderRadius: "10px",
              padding: "6px 12px",
            },
          }}
          sx={{
            width: "500px",
            border: "1px solid #1976d2",
            boxShadow: "1px 1px 4px rgba(0, 0, 0, 0.2)",
          }}
        />
      </div>

      {/* Navigation Links */}
      <div style={{ width: "40%", display: "flex", justifyContent: "space-between" }}>
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <Button variant="text" className="btn nav">
            Home
          </Button>
        </Link>
        <Link to={"/courses"} style={{ textDecoration: "none" }}>
          <Button variant="text" className="btn nav">
            Courses
          </Button>
        </Link>
        <Link to={"/about-us"} style={{ textDecoration: "none" }}>
          <Button variant="text" className="btn nav">
            About Us
          </Button>
        </Link>
        <Link to={"/login"} style={{ textDecoration: "none" }}>
          <Button variant="text" className="btn nav">
            Login
          </Button>
        </Link>
        <Link to={"/signup"} style={{ textDecoration: "none" }}>
          <Button variant="text" className="btn nav">
            Signup
          </Button>
        </Link>
      </div>
    </div>
  );
}

function App() {
  const location = useLocation();

  // Determine whether to render the Navbar and Footer
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      <div>
        {!isAdminRoute && <Navbar />} {/* Render Navbar only if not in Admin */}
        <div style={{ marginBottom: !isAdminRoute ? "100px" : "0" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/courses" element={<Course />} />
            <Route path="/admin" element={<DashboardLayoutBasic />} />
            <Route path="/coursedetails" element={<CourseDetails />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
          </Routes>
        </div>
        {!isAdminRoute && (
          <div style={{ height: "150px", backgroundColor: "#282c34" }}>
            <Footer />
          </div>
        )} {/* Render Footer only if not in Admin */}
      </div>
    </>
  );
}

export default function RootApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
