import { Box, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Signup() {
    function signup(){
        axios.post('https://google.com')
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
                />

                <TextField
                    label="First Name"
                    name="firstname"
                    variant="outlined"
                    size="small"
                    required
                />

                <TextField
                    label="Last Name"
                    name="lastname"
                    variant="outlined"
                    size="small"
                    required
                />

                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    variant="outlined"
                    size="small"
                    required
                />

                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    variant="outlined"
                    size="small"
                    required
                />

                <TextField
                    label="Contact Number"
                    name="number"
                    type="number"
                    variant="outlined"
                    size="small"
                    required
                />

                <Button  onClick={signup}
                  color="success" type="submit" variant="contained">
                    Register
                </Button>
               
                <div style={{margin:'auto'}}>
                      <p style={{marginTop:'0px'}}>Already have an account?</p>
                    <Link style={{marginLeft:'30px'}} to={"/login"}><Button variant="text" className="btn nav">Login</Button></Link>
                </div>
              
                
            </Box>
        </>
    );
}
