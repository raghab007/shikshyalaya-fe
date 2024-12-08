import React from "react";
import { Button, TextField, Typography, Box, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
    // Shared styles
    const formStyle = {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "300px",
        margin: "auto",
        marginTop: "50px",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    };

    const linkStyle = {
        margin: "auto",
        textAlign: "center",
        marginTop: "10px",
    };

    const inputSize = "small"; // Maintain consistent TextField size

    // Login function
    function handleLogin() {
        axios.get("http://localhost:8085/health");
    }

    return (
        <Box sx={formStyle}>
            <Typography variant="h6" align="center" gutterBottom>
                Login
            </Typography>

            {/* Email and Password Fields */}
            <TextField
                label="Email"
                type="email"
                variant="outlined"
                size={inputSize}
                required
            />
            <TextField
                label="Password"
                type="password"
                variant="outlined"
                size={inputSize}
                required
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleLogin}
                sx={{ marginTop: "10px" }}
            >
                Login
            </Button>

            {/* Sign Up Section */}
            <Box sx={linkStyle}>
                <Typography variant="body2">Don't have an account?</Typography>
                <Link to="/signup">
                    <Button variant="text">Sign Up</Button>
                </Link>
            </Box>

            {/* Forgot Password Section */}
            <Box sx={{ textAlign: "center", marginTop: "10px" }}>
                <Link  to="/forgotpassword" underline="hover" color="secondary">
                    Forgot Password?
                </Link>
            </Box>
        </Box>
    );
}
