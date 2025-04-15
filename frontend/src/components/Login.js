import React from 'react'
import { Box, Typography, TextField, Button } from '@mui/material'
import { useState } from 'react'
import { login } from '../services/userService'
import { useNavigate } from 'react-router-dom'
const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const handleSubmit = (event) => {
        event.preventDefault();
        const submitData = async () => {
            try {
                const response = await login(formData);
                console.log(response);
                return response;
            } catch (error) {
                console.error('Error:', error);
                return error;
            }

        }
        submitData()
        .then((data)=>{
            console.log(data)
            return navigate('/layout')
        })
        .catch((err)=>{
            console.log(err);
            return navigate('/login');
        })
        .finally(()=>{
            setFormData({
                email: "",
                password: "",
            });
        })  
    }
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }
    return (
        <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", marginTop: "50px" }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '20px', width: "50%" }}>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#8F00FF' }}>
                        Login
                    </Typography>
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

export default Login