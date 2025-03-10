import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilState } from "recoil";
import userRecoilState from "../store/atoms/user.js";
import { userProfileSelector } from "../store/atoms/profle.js";

export default function Login() {
  const userName = useRef(null);
  const password = useRef(null);
  const [state, setUserState] = useRecoilState(userRecoilState);
  const [userState, setUserProfileState] = useRecoilState(userProfileSelector);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  useEffect(() => {
    if (state) {
      location.href = "/";
    }
  }, []);

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
      const token = response.data.token;
      const ROLE = response.data.role;

      if (token) {
        localStorage.setItem("token", token);
        setUserState(true);

        alert("Login successful");

        if (ROLE == "USER") {
          location.href = "/";
        } else if (ROLE == "INSTRUCTOR") {
          location.href = "/instructor";
        }
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      console.log(err);
      alert("Server error. Please try again later.");
    }
  }

  return (
      <div className="flex items-center justify-center min-h-screen bg-blue-50 p-6 font-sans">
        {/* Login Form */}
        <div className="w-full max-w-md p-8 bg-white shadow-2xl rounded-2xl transform transition-all duration-300 hover:shadow-3xl">
          <h2 className="text-center text-4xl font-bold text-gray-800 mb-2 font-poppins">
            Welcome to Shikshyalaya
          </h2>
          <h3 className="text-center text-lg text-gray-600 mb-8 font-poppins">
            Login to Continue Learning
          </h3>

          {/* Username Field */}
          <div className="mb-6">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1 font-poppins">
              Username
            </label>
            <input
                type="text"
                id="username"
                placeholder="Enter your username"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all font-poppins"
                required
                ref={userName}
            />
          </div>

          {/* Password Field */}
          <div className="mb-8 relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1 font-poppins">
              Password
            </label>
            <div className="relative">
              <input
                  type={showPassword ? "text" : "password"} // Toggle input type
                  id="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all pr-12 font-poppins"
                  required
                  ref={password}
              />
              {/* Show/Hide Password Button */}
              <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 px-4 py-3 text-sm text-gray-600 hover:text-indigo-600 focus:outline-none font-poppins"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
              onClick={handleLogin}
              className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200 transform hover:scale-105 active:scale-95 font-poppins"
          >
            Log In
          </button>

          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600 font-poppins">
              Don't have an account?{" "}
              <Link to="/signup" className="text-indigo-600 hover:underline font-medium">
                Sign Up
              </Link>
            </p>
          </div>

          {/* Forgot Password Link */}
          <div className="text-center mt-4">
            <Link to="/forgotpassword" className="text-sm text-indigo-600 hover:underline font-medium font-poppins">
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>
  );
}