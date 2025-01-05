import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import userState from "../store/atoms/user.js";
import axios from "axios";
import { useRecoilState } from "recoil";

export default function Login() {
  const userName = useRef(null);
  const password = useRef(null);
  const [state, setUserState] = useRecoilState(userState);
  // const [profile, setProfile] = useRecoilState(userProfileState);
  const navigate = useNavigate();
  useEffect(function () {
    if (state) {
      navigate("/")
    }
  }, [])
  // Handle login logic
  async function handleLogin() {
    const user = {
      userName: userName.current.value,
      password: password.current.value,
    };

    try {
      const response = await axios.post("http://localhost:8085/login", user, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response.data);
      if (response.data) {
        // Store token in localStorage
        localStorage.setItem("token", response.data);
        // Update the Recoil state to true indicating the user is logged in
        setUserState(true);
        alert("Login successful");
        navigate("/");
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      console.log(err);
      alert("Server error. Please try again later.");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
      {/* Login Form */}
      <div className="w-96 p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-6">Welcome to LearnNow {state ? "true" : "false"}</h2>
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
