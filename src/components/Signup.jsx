import { Box, TextField, Button, Typography } from '@mui/material';
export default function Signup(){
    const inputStyle = 
    {
        
    }
    return (
        <>
        {/* <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
        <TextField className='textField' placeholder='enter your username' ></TextField>
        <TextField placeholder='enter your firstname' ></TextField>
        <TextField placeholder='enter your lastname' ></TextField>
        <TextField type='password' placeholder='enter your password'></TextField>
        <TextField  type='number 'placeholder='enter you contact number'></TextField>
        <Button>Register</Button>
        </div> */}
        <Box
        component="form"
    
        sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            width: '400px',
            margin: 'auto',
            marginTop: 4,
            padding: 2,
            border: '1px solid #ccc',
            borderRadius: 1,
        }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Sign Up
      </Typography>

      <TextField
        label="Username"
        name="username"
      
       
        variant="outlined"
        required
      />

      <TextField
        label="FirstName"
        name="firstname"
      
       
        variant="outlined"
        required
      />  

      <TextField
        label="LastName"
        name="lastname"
      
       
        variant="outlined"
        required
      />  

      <TextField
        label="Password"
        name="username"
      type='password'
        
        variant="outlined"
        required
      />

      <TextField
        label="Email"
        name="email"
       
        type="email"
        variant="outlined"
        required
      />

<TextField
        label="Contact Number"
        name="number"
       
        type="number"
        variant="outlined"
        required
      />


      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>

        </>
    )

}