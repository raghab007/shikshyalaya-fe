import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // Validation schema
  const validationSchema = Yup.object().shape({
    userName: Yup.string().required("Username is required"),
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    contactNumber: Yup.string()
      .matches(/^\d{10}$/, "Contact Number must be 10 digits")
      .required("Contact Number is required"),
    role: Yup.string().required("Role is required"),
    age: Yup.number()
      .min(1, "Age must be at least 1")
      .required("Age is required"),
    address: Yup.string().required("Address is required"),
  });

  // Using Formik with validateOnChange set to false
  const formik = useFormik({
    initialValues: {
      userName: "",
      firstName: "",
      lastName: "",
      password: "",
      email: "",
      contactNumber: "",
      role: "",
      age: "",
      address: "",
    },
    validationSchema,
    validateOnChange: false, // Only validate on blur and submit
    validateOnBlur: true,
    onSubmit: async (values) => {
      try {
        const response = await axios.post("http://localhost:8085/signup", values, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.data === true) {
          alert("User registered successfully");
          formik.resetForm();
          navigate("/login");
        } else {
          alert("User already exists");
        }
      } catch (error) {
        alert("Error occurred during registration");
      }
    },
  });

  // Handle form field changes with a separate handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-cyan-100 to-blue-100 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-60"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-200 rounded-full translate-x-1/3 translate-y-1/3 opacity-60"></div>
      
      {/* Blurred Overlay */}
      <div className="absolute inset-0 bg-white bg-opacity-30 backdrop-blur-sm z-10"></div>

      {/* Container for Image and Form */}
      <div className="flex w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden relative z-20">
        {/* Image Section */}
        <div className="w-1/2 bg-gradient-to-br from-blue-50 to-cyan-100 flex items-center justify-center p-6">
          <div className="relative w-full h-full overflow-hidden rounded-xl shadow-inner">
            <div className="absolute inset-0 bg-blue-500 opacity-10"></div>
            <img
              src="https://plus.unsplash.com/premium_photo-1661481400542-5c599ccb363e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZSUyMGxlYXJuaW5nfGVufDB8fDB8fHww"
              alt="E-Learning Platform"
              className="w-full h-full object-cover rounded-xl"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
              <h2 className="text-white text-xl font-bold">Start Your Learning Journey</h2>
              <p className="text-gray-200 text-sm mt-2">Join our community of learners today</p>
            </div>
          </div>
        </div>

        {/* Signup Form Section */}
        <div className="w-1/2 p-8 bg-white">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
            <p className="text-sm text-gray-500 mt-1">Fill in your details to get started</p>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-3">
            {/* Username */}
            <div className="mb-3">
              <input
                type="text"
                placeholder="Username"
                id="userName"
                name="userName"
                value={formik.values.userName}
                onChange={handleChange}
                onBlur={formik.handleBlur}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all duration-200 ${
                  formik.touched.userName && formik.errors.userName 
                    ? "border-red-400 bg-red-50" 
                    : "border-gray-300 hover:border-blue-300"
                }`}
              />
              {formik.touched.userName && formik.errors.userName && (
                <p className="text-red-500 text-xs mt-1">{formik.errors.userName}</p>
              )}
            </div>

            {/* First and Last Name */}
            <div className="flex gap-3">
              <div className="w-1/2 mb-3">
                <input
                  type="text"
                  placeholder="First Name"
                  id="firstName"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all duration-200 ${
                    formik.touched.firstName && formik.errors.firstName 
                      ? "border-red-400 bg-red-50" 
                      : "border-gray-300 hover:border-blue-300"
                  }`}
                />
                {formik.touched.firstName && formik.errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.firstName}</p>
                )}
              </div>
              <div className="w-1/2 mb-3">
                <input
                  type="text"
                  placeholder="Last Name"
                  id="lastName"
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all duration-200 ${
                    formik.touched.lastName && formik.errors.lastName 
                      ? "border-red-400 bg-red-50" 
                      : "border-gray-300 hover:border-blue-300"
                  }`}
                />
                {formik.touched.lastName && formik.errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="mb-3">
              <input
                type="email"
                placeholder="Email Address"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={handleChange}
                onBlur={formik.handleBlur}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all duration-200 ${
                  formik.touched.email && formik.errors.email 
                    ? "border-red-400 bg-red-50" 
                    : "border-gray-300 hover:border-blue-300"
                }`}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
              )}
            </div>

            {/* Password with toggle */}
            <div className="mb-3 relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                id="password"
                name="password"
                value={formik.values.password}
                onChange={handleChange}
                onBlur={formik.handleBlur}
                className={`w-full p-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all duration-200 ${
                  formik.touched.password && formik.errors.password 
                    ? "border-red-400 bg-red-50" 
                    : "border-gray-300 hover:border-blue-300"
                }`}
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>
              )}
            </div>

            {/* Contact Number */}
            <div className="mb-3">
              <input
                type="tel"
                placeholder="Contact Number (10 digits)"
                id="contactNumber"
                name="contactNumber"
                value={formik.values.contactNumber}
                onChange={handleChange}
                onBlur={formik.handleBlur}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all duration-200 ${
                  formik.touched.contactNumber && formik.errors.contactNumber
                    ? "border-red-400 bg-red-50" 
                    : "border-gray-300 hover:border-blue-300"
                }`}
              />
              {formik.touched.contactNumber && formik.errors.contactNumber && (
                <p className="text-red-500 text-xs mt-1">{formik.errors.contactNumber}</p>
              )}
            </div>

            {/* Age */}
            <div className="mb-3">
              <input
                type="number"
                placeholder="Age"
                id="age"
                name="age"
                value={formik.values.age}
                onChange={handleChange}
                onBlur={formik.handleBlur}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all duration-200 ${
                  formik.touched.age && formik.errors.age 
                    ? "border-red-400 bg-red-50" 
                    : "border-gray-300 hover:border-blue-300"
                }`}
              />
              {formik.touched.age && formik.errors.age && (
                <p className="text-red-500 text-xs mt-1">{formik.errors.age}</p>
              )}
            </div>

            {/* Address */}
            <div className="mb-3">
              <input
                type="text"
                placeholder="Address"
                id="address"
                name="address"
                value={formik.values.address}
                onChange={handleChange}
                onBlur={formik.handleBlur}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all duration-200 ${
                  formik.touched.address && formik.errors.address 
                    ? "border-red-400 bg-red-50" 
                    : "border-gray-300 hover:border-blue-300"
                }`}
              />
              {formik.touched.address && formik.errors.address && (
                <p className="text-red-500 text-xs mt-1">{formik.errors.address}</p>
              )}
            </div>

            {/* Role Selection */}
            <div className="mb-3">
              <select
                id="role"
                name="role"
                value={formik.values.role}
                onChange={handleChange}
                onBlur={formik.handleBlur}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all duration-200 ${
                  formik.touched.role && formik.errors.role 
                    ? "border-red-400 bg-red-50" 
                    : "border-gray-300 hover:border-blue-300"
                }`}
              >
                <option value="" disabled>
                  Select Your Role
                </option>
                <option value="USER">Student</option>
                <option value="INSTRUCTOR">Instructor</option>
              </select>
              {formik.touched.role && formik.errors.role && (
                <p className="text-red-500 text-xs mt-1">{formik.errors.role}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg text-sm hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Create Account
              </button>
            </div>

            {/* Login Redirect */}
            <p className="text-center mt-6 text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 font-medium hover:text-blue-700 transition-colors">
                Log In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}