import React from 'react'
import { Box, Typography, TextField, Button } from '@mui/material'
import { useState } from 'react'
import { register } from '../services/userService'
import { useNavigate } from 'react-router-dom'
const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
    });
    const handleSubmit = (event) => {
        event.preventDefault();
        const submitData = async () => {
            try {
                const response = await register(formData);
                console.log(response);
                return response;
            } catch (error) {
                console.error('Error:', error);
                return error;
            }

        }
        const response = submitData();
        setFormData({
            fullName:"",
            email: "",
            password: "",
        });
        if(response){
            return navigate('/layout')
        }
        else{
            return navigate('/login')
        } 
    }
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }
    return (
        <Box sx={{ display: 'flex', justifyContent: "center", alignItems:"center",marginTop:"50px" }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '20px',width:"50%" }}>
                <Box>
                    <Typography variant="h4" sx={{ color:'#8F00FF',fontWeight: 'bold' }}>
                        Register
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'normal', color: "gray" }}>
                        Full Name
                    </Typography>
                    <TextField
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        variant="outlined"
                        placeholder="Full Name"
                        fullWidth
                    />

                </Box>
                <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'normal', color: "gray" }}>
                        Email
                    </Typography>
                    <TextField
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        variant="outlined"
                        placeholder="Email"
                        fullWidth
                    />

                </Box>
                <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'normal', color: "gray" }}>
                        Password
                    </Typography>
                    <TextField
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        variant="outlined"
                        placeholder="Password"
                        fullWidth
                    />
                </Box>
                <Box>
                    <Button variant="contained" onClick={handleSubmit} sx={{ backgroundColor: '#8F00FF' }}>
                        Save
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

export default Register