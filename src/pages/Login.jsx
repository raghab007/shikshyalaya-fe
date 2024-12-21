import React, { useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const userName = useRef(null);
  const password = useRef(null);

  async function handleLogin() {
    const user = {
      userName: userName.current.value,
      password: password.current.value,
    };

    const response = await axios.post("http://localhost:3000/login", user, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    } else {
      alert("Invalid credentials");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
      {/* Login Form */}
      <div className="w-96 p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-6">Welcome to LearnNow</h2>
        <h3 className="text-center text-lg text-gray-600 mb-6">Login to Continue Learning</h3>

        {/* Username Field */}
        <input
          type="text"
          placeholder="Username"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          ref={userName}
        />

        {/* Password Field */}
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          ref={password}
        />

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Log In
        </button>

        {/* Sign Up Link */}
        <div className="text-center mt-4">
          <p className="text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>

        {/* Forgot Password Link */}
        <div className="text-center mt-2">
          <Link to="/forgotpassword" className="text-blue-500 hover:underline text-sm">
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
}
