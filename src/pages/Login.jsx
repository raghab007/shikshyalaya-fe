import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import userState from "../store/atoms/user.js";
import axios from "axios";
import { useRecoilState } from "recoil";
import userRecoilState from "../store/atoms/user.js";

export default function Login() {
  const userName = useRef(null);
  const password = useRef(null);
  const [state, setUserState] = useRecoilState(userRecoilState);
  const navigate = useNavigate();

  useEffect(() => {
    if (state) {
      navigate("/");
    }
  }, [state, navigate]);

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
       
       if(ROLE=="USER"){
        navigate("/")
       }else if (ROLE=="INSTRUCTOR"){
        navigate("/instructor")
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500 p-4">
      {/* Login Form */}
      <div className="w-full max-w-md p-8 bg-white shadow-2xl rounded-xl">
        <h2 className="text-center text-4xl font-bold text-gray-800 mb-2">Welcome to Shikshyalaya</h2>
        <h3 className="text-center text-lg text-gray-600 mb-8">Login to Continue Learning</h3>

        {/* Username Field */}
        <div className="mb-6">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
            ref={userName}
          />
        </div>

        {/* Password Field */}
        <div className="mb-8">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
            ref={password}
          />
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 transform hover:scale-105 active:scale-95"
        >
          Log In
        </button>

        {/* Sign Up Link */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline font-medium">
              Sign Up
            </Link>
          </p>
        </div>

        {/* Forgot Password Link */}
        <div className="text-center mt-4">
          <Link to="/forgotpassword" className="text-sm text-blue-600 hover:underline font-medium">
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
}