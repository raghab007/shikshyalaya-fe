import { Box, TextField, Button, Typography, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Signup() {
    const userName = useRef(null);
    const firstName = useRef(null);
    const lastName = useRef(null);
    const password = useRef(null);
    const email = useRef(null);
    const contactNumber = useRef(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    function signup(e) {
        e.preventDefault();
        let user = {
            userName: userName.current.value,
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            password: password.current.value,
            email: email.current.value,
            contactNumber: contactNumber.current.value
        }
        console.log(user)
        console.log(JSON.stringify(user));

        async function hello() {
            try {
                const value = await axios.post('http://localhost:8085/public/signup', user, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                console.log(value.data);

                if (value.data === true) {
                    setSnackbarMessage('User registered successfully');
                    setSnackbarSeverity('success');
                } else {
                    setSnackbarMessage('User not registered');
                    setSnackbarSeverity('error');
                }
            } catch (error) {
                setSnackbarMessage('Error occurred during registration');
                setSnackbarSeverity('error');
            } finally {
                setOpenSnackbar(true);
            }
        }
        hello();
    }

    return (
        <>
            <Box
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    width: '300px', // Adjusted width
                    margin: 'auto',
                    marginTop: 4,
                    padding: 2, // Reduced padding
                    border: '1px solid #ccc',
                    borderRadius: 1,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)', // Optional shadow for better aesthetics
                }}
            >
                <Typography variant="h6" align="center" gutterBottom>
                    Sign Up
                </Typography>

                <TextField
                    label="Username"
                    name="username"
                    variant="outlined"
                    size="small" // Smaller input size
                    required
                    inputRef={userName}
                />

                <TextField
                    label="First Name"
                    name="firstname"
                    variant="outlined"
                    size="small"
                    required
                    inputRef={firstName}
                />

                <TextField
                    label="Last Name"
                    name="lastname"
                    variant="outlined"
                    size="small"
                    required
                    inputRef={lastName}
                />

                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    variant="outlined"
                    size="small"
                    required
                    inputRef={password}
                />

                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    variant="outlined"
                    size="small"
                    required
                    inputRef={email}
                />

                <TextField
                    label="Contact Number"
                    name="number"
                    type="number"
                    variant="outlined"
                    size="small"
                    required
                    inputRef={contactNumber}
                />

                <Button onClick={signup} color="success" type="submit" variant="contained">
                    Register
                </Button>

                <div style={{ margin: 'auto' }}>
                    <p style={{ marginTop: '0px' }}>Already have an account?</p>
                    <Link style={{ marginLeft: '30px' }} to={"/login"}><Button variant="text" className="btn nav">Login</Button></Link>
                </div>
            </Box>

            {/* Snackbar for success or error messages */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
            >
                <Alert
                    onClose={() => setOpenSnackbar(false)}
                    severity={snackbarSeverity}
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
}
