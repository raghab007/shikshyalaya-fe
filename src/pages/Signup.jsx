import { useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

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
    // const [openSnackbar, setOpenSnackbar] = useState(false);
    // const [snackbarMessage, setSnackbarMessage] = useState("");
    // const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    // const [loading, setLoading] = useState(false);

    function signup(e) {
        e.preventDefault();
        // setLoading(true);

        // // Validation for empty fields
        // if (
        //     !userName.current.value.trim() ||
        //     !firstName.current.value.trim() ||
        //     !lastName.current.value.trim() ||
        //     !password.current.value.trim() ||
        //     !email.current.value.trim() ||
        //     !contactNumber.current.value.trim() ||
        //     !role.current.value
        // ) {
        //     setSnackbarMessage("All fields are required, including role");
        //     setSnackbarSeverity("error");
        //     setOpenSnackbar(true);
        //     setLoading(false);
        //     return;
        // }

        // API call
        const user = {
            userName: userName.current.value,
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            password: password.current.value,
            email: email.current.value,
            contactNumber: contactNumber.current.value,
            role: role.current.value,
            age:age.current.value,
            address:address.current.value
        };

        async function registerUser() {
            try {
                const response = await axios.post("http://localhost:3000/register", user, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                console.log(response)
                
                if (response.data.message === "true") {
                    alert("User registered successfully");
                    
                } else {
                  alert("User already exists");
                  
                }
            } catch (error) {
                alert("Error occurred during registration");
               
            } finally {
                // setLoading(false);
                // setOpenSnackbar(true);
            }
        }

        registerUser();
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 ">
            <form
                onSubmit={signup}
                className="bg-white p-6  wrounded-2xl shadow-lg w-81 border border-gray-300"
            >
                <h2 className="text-center text-2xl font-semibold mb-4">Sign Up</h2>

                {/* Input Fields */}
                <input
                    type="text"
                    placeholder="Username"
                    ref={userName}
                    className="w-full p-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                <div className="flex">
                <input
                    type="text"
                    placeholder="First Name"
                    ref={firstName}
                    className="w-full p-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    ref={lastName}
                    className="w-full p-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                </div>

                <input
                    type="number"
                    placeholder="age"
                    ref={age}
                    className="w-full p-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                <input
                    type="address"
                    placeholder="Enter address"
                    ref={address}
                    className="w-full p-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    ref={password}
                    className="w-full p-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    ref={email}
                    className="w-full p-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                <input
                    type="tel"
                    placeholder="Contact Number"
                    ref={contactNumber}
                    className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                {/* Role Dropdown */}
                <select
                    ref={role}
                    className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                >
                    <option value="" disabled selected>
                        Select Role
                    </option>
                    <option value="USER">User</option>
                    <option value="INSTRUCTOR">Instructor</option>
                </select>

                {/* Submit Button */}
               <Button className="ml-2" onClick={signup}>Signup</Button>
            

                {/* Login Redirect */}
                <p className="text-center mt-4 text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Login
                    </Link>
                </p>
            </form>

           
        </div>
    );
}
