import { useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const userName = useRef(null);
  const firstName = useRef(null);
  const lastName = useRef(null);
  const password = useRef(null);
  const email = useRef(null);
  const contactNumber = useRef(null);
  const role = useRef(null);
  const age = useRef(null);
  const address = useRef(null);
  const navigate = useNavigate();

  async function signup(e) {
    e.preventDefault();
    const user = {
      userName: userName.current.value,
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      password: password.current.value,
      email: email.current.value,
      contactNumber: contactNumber.current.value,
      role: role.current.value,
      age: age.current.value,
      address: address.current.value,
    };

    try {
      const response = await axios.post("http://localhost:8085/signup", user, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data == true) {
        alert("User registered successfully");
        userName.current.value = "";
        firstName.current.value = "";
        lastName.current.value = "";
        password.current.value = "";
        email.current.value = "";
        contactNumber.current.value = "";
        role.current.value = "";
        age.current.value = "";
        address.current.value = "";
        navigate("/login");
      } else {
        alert("User already exists");
      }
    } catch (error) {
      alert("Error occurred during registration");
    }
  }

  return (
      <div className="flex items-center justify-center min-h-screen bg-cyan-200 relative overflow-hidden">
        {/* Blurred Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-10"></div>

        {/* Container for Image and Form */}
        <div className="flex w-full max-w-6xl bg-white rounded-lg shadow-2xl overflow-hidden relative z-20">
          {/* Image Section */}
          <div className="w-1/2 bg-blue-100 flex items-center justify-center p-4">
            <img
                src="https://plus.unsplash.com/premium_photo-1661481400542-5c599ccb363e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZSUyMGxlYXJuaW5nfGVufDB8fDB8fHww" // Replace with your e-learning platform image URL
                alt="E-Learning Platform"
                className="w-full h-auto rounded-lg"
            />
          </div>

          {/* Signup Form Section */}
          <form
              onSubmit={signup}
              className="w-1/2 p-8 bg-cyan-50"
          >
            <h2 className="text-2xl font-semibold  text-center mb-6 text-gray-800">Sign Up</h2>

            {/* Username */}
            <input
                type="text"
                placeholder="Username"
                ref={userName}
                className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                required
            />

            {/* First and Last Name */}
            <div className="flex gap-4 mb-4">
              <input
                  type="text"
                  placeholder="First Name"
                  ref={firstName}
                  className="w-1/2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  required
              />
              <input
                  type="text"
                  placeholder="Last Name"
                  ref={lastName}
                  className="w-1/2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  required
              />
            </div>

            {/* Age */}
            <input
                type="number"
                placeholder="Age"
                ref={age}
                className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                required
            />

            {/* Address */}
            <input
                type="text"
                placeholder="Address"
                ref={address}
                className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                required
            />

            {/* Password */}
            <input
                type="password"
                placeholder="Password"
                ref={password}
                className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                required
            />

            {/* Email */}
            <input
                type="email"
                placeholder="Email"
                ref={email}
                className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                required
            />

            {/* Contact Number */}
            <input
                type="tel"
                placeholder="Contact Number"
                ref={contactNumber}
                className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                required
            />

            {/* Role Selection */}
            <select
                ref={role}
                className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                required
            >
              <option value="" disabled selected>
                Select Role
              </option>
              <option value="USER">User</option>
              <option value="INSTRUCTOR">Instructor</option>
            </select>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg text-sm hover:bg-blue-600 transition"
            >
              Sign Up
            </button>

            {/* Login Redirect */}
            <p className="text-center mt-4 text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
  );
}