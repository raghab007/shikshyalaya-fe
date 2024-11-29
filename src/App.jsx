import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import { Button, TextField } from "@mui/material";
import Course from "./pages/Course";
import Footer from "./pages/Footer";
import { useRef, useState } from "react";
import RecipeReviewCard from "./components/Something";
import Logo from './assets/logo2.png';  // Assuming the logo image is saved here
import DashboardLayoutBasic from "./pages/Admin";

function App() {
  return (
    <>
      <div style={{ marginBottom: "100px" }}>
        <BrowserRouter>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              font: "white",
              padding: "20px 50px",
            }}
          >
            {/* Logo and Title */}
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={Logo} // Add your logo image here
                alt="Sikshyalaya Logo"
                style={{
                  width: "60px", // Increased logo size
                  height: "60px",
                  marginRight: "15px", // More space between logo and text
                  transition: "transform 0.3s ease-in-out", 
                  borderRadius: '15px' // Smooth scaling on hover
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = "scale(1.1)"; // Scale up on hover
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = "scale(1)"; // Reset scale on mouse out
                }}
              />
             
             <h1
  style={{
    color: "#1976d2", // Primary color
    fontSize: "2rem", // Increased font size for better visibility
    fontWeight: "bold", // Make it bold
    margin: 0,
    letterSpacing: "1px", // Slight space between letters for a cleaner look
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)", // Add shadow for depth
  }}
>
  <Link
    to={"/"}
    style={{
      textDecoration: "none", // Remove the underline
      color: "#1976d2", // Ensure the link color is the same as the text color
    }}
  >
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
                    backgroundColor: "white", // Set the background color
                    borderRadius: "10px", // Add slight rounding to corners
                    padding: "6px 12px",
                    fontFamily: 'sans-serif',
        
                  },
                }}
                sx={{
                  width: "500px", // Increase the width
                  border: "1px solid blue", // Optional: Add a border
                  boxShadow: "100 1px 4px rgba(0, 0, 0, 0.2)", 
                  borderRadius:'10px',// Optional: Add shadow for depth
        
                }}
                inputProps={{
                  style: {
                    color: "#333", // Dark text color for search text
                  },
                }}
                // Add placeholder text styling
                inputProps={{
                  style: {
                    color: "#1976d2", // Make the placeholder text visible in the primary color
                  },
                }}
              />
            </div>

            {/* Navigation Links */}
            <div
              style={{
                width: "40%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Link  to={"/"}>
                <Button variant="text" className="btn nav"  >
                  Home
                </Button>
              </Link>
              <Link to={"/courses"}>
                <Button variant="text" className="btn nav"  >
                  Courses
                </Button>
              </Link>
              <Link to={"/about-us"}>
                <Button variant="text" className="btn nav" >
                  About Us
                </Button>
              </Link>
              <Link to={"/login"}>
                <Button variant="text" className="btn nav" >
                  Login
                </Button>
              </Link>
              <Link to={"/signup"}>
                <Button variant="text" className="btn nav"  >
                  Signup
                </Button>
              </Link>
            </div>
          </div>

          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/about-us" element={<AboutUs />}></Route>
            <Route path="/courses" element={<Course />}></Route>
            <Route path="/admin" element={<DashboardLayoutBasic></DashboardLayoutBasic>}></Route>

          </Routes>
        </BrowserRouter>
      </div>

      {/* Footer */}
      <div style={{ height: "250px", backgroundColor: "#1976d2" }}>
        <Footer />
      </div>
    </>
  );
}

export default App;
