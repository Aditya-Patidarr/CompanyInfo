import React from 'react'
import { Box, Typography, TextField, Button } from '@mui/material'
import { useState, useEffect } from 'react'
import { login } from '../services/userService'
import { useNavigate } from 'react-router-dom'
const Login = () => {
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState("");
    const [sessionMsg, setSessionMsg] = useState("Session Ended, Please Log in again!!");
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    useEffect(() => {
        if (errorMsg) {
            const timer = setTimeout(() => {
                setErrorMsg("");
            }, 3000);

            return () => clearTimeout(timer);
        }
        if (sessionMsg) {
            const timer = setTimeout(() => {
                setSessionMsg("");
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [errorMsg,sessionMsg]);
    const handleSubmit = (event) => {
        event.preventDefault();
        const submitData = async () => {
            try {
                const result = await login(formData);
                if (!result.success) {
                    setErrorMsg(result.message);
                    return;
                }
                console.log("LoggedIn Successfully: ",result.data);
                return navigate('/layout');
            } catch (error) {
                console.log('Unexpected error:', error);
                setErrorMsg("Something went wrong. Please try again.");
            } finally {
                setFormData({
                    email: "",
                    password: "",
                });
            }
        };

        submitData();
    };
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
                {sessionMsg && <p style={{
                    color: 'grey', fontSize: '0.9rem',
                    marginTop: '10px', fontWeight: 'bold'
                }}>{sessionMsg}</p>}
                {errorMsg && <p style={{
                    color: 'red', fontSize: '0.9rem',
                    marginTop: '10px', fontWeight: 'bold'
                }}>{errorMsg}</p>}
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