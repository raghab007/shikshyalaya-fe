import React, { useState } from "react";
import axios from "axios";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [emailError, setEmailError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmailError(false); // Reset email error
        if (!email || !validateEmail(email)) {
            setEmailError(true); // Show error if email is not valid
            return;
        }

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

    const validateEmail = (email) => {
        // Basic email validation
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(email);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-xl font-semibold text-center mb-4">Forgot Password</h2>
                <p className="text-center mb-6 text-gray-600">
                    Enter your email address and we'll send you instructions to reset your password.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                emailError ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="Email"
                            required
                        />
                        {emailError && (
                            <p className="text-red-500 text-xs mt-1">Please enter a valid email address.</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className={`w-full py-2 text-white rounded-md ${
                            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                        } focus:outline-none`}
                        disabled={loading}
                    >
                        {loading ? "Sending..." : "Send Reset Instructions"}
                    </button>
                </form>

                {/* Snackbar for messages */}
                {snackbarOpen && (
                    <div
                        className={`mt-4 p-4 rounded-md text-white ${
                            snackbarSeverity === "success" ? "bg-green-500" : "bg-red-500"
                        }`}
                    >
                        {snackbarMessage}
                    </div>
                )}
            </div>
        </div>
    );
}
