import React, { useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
    const userName = useRef(null);
    const password = useRef(null);
   async function handleLogin ()  {

    const user = {
        userName:userName.current.value,
        password:password.current.value
    }

        const response = await axios.post("http://localhost:3000/login", user, {
                            headers: {
                                "Content-Type": "application/json",
                            },
                        });

            if(response.data.token){
              localStorage.setItem('token',response.data.token)
            }else{
                alert("Invalid credentails")
            }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {/* Login Form */}
            <div className="w-80 p-6 bg-white shadow-md rounded-md border">
                <h2 className="text-center text-xl font-semibold mb-4">Login</h2>
                
                {/* Email Field */}
                <input
                    type="text"
                    placeholder="username"
                    className="w-full px-3 py-2 border rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    ref={userName}
                />

                {/* Password Field */}
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-3 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    ref={password}
                />

                {/* Login Button */}
                <button
                    onClick={handleLogin}
                    className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                >
                    Login
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
