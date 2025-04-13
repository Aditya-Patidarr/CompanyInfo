import React from 'react'
import { Box, Typography, TextField, Button } from '@mui/material'
import { useState } from 'react'
import { useTheme } from '@mui/material/styles'
import { login } from '../services/userService'
import { useNavigate } from 'react-router-dom'
const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const theme = useTheme();
    const handleSubmit = (event) => {
        event.preventDefault();
        const submitData = async () => {
            try {
                const response = await login(formData);
                console.log(response);
            } catch (error) {
                console.error('Error:', error);
            }

        }
        submitData();
        setFormData({
            email: "",
            password: "",
        });
        return navigate('/layout')
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
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: `${theme.palette.primary.main}` }}>
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
                    <Button variant="contained" onClick={handleSubmit} sx={{ backgroundColor: theme.palette.primary.main }}>
                        Save
                    </Button>
                </Box>

            </Box>
        </Box>
    )
}

export default Login