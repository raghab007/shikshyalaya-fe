import React, { useState } from "react";
import { Box, TextField, Button, Typography, Snackbar, Alert } from "@mui/material";
import axios from "axios";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post("http://localhost:8085/public/forgot-password", { email });
            if (response.status === 200) {
                setSnackbarMessage("Password reset instructions sent to your email.");
                setSnackbarSeverity("success");
            } else {
                setSnackbarMessage("Unable to process your request.");
                setSnackbarSeverity("error");
            }
        } catch (error) {
            setSnackbarMessage("An error occurred. Please try again later.");
            setSnackbarSeverity("error");
        } finally {
            setLoading(false);
            setSnackbarOpen(true);
        }
    };

    return (
        <Box
            component="form"
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: "300px",
                margin: "auto",
                marginTop: 4,
                padding: 2,
                border: "1px solid #ccc",
                borderRadius: 1,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
            onSubmit={handleSubmit}
        >
            <Typography variant="h6" align="center" gutterBottom>
                Forgot Password
            </Typography>

            <Typography variant="body2" align="center">
                Enter your email address and we'll send you instructions to reset your password.
            </Typography>

            <TextField
                label="Email"
                type="email"
                variant="outlined"
                size="small"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={loading}
            >
                {loading ? "Sending..." : "Send Reset Instructions"}
            </Button>

            {/* Snackbar for messages */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
            >
                <Alert
                    onClose={() => setSnackbarOpen(false)}
                    severity={snackbarSeverity}
                    sx={{ width: "100%" }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}
