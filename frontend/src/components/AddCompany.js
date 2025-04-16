import React from 'react'
import { Box, Typography, Dialog, TextField, Button } from '@mui/material'
import { useState, useEffect } from 'react'
import { addCompany } from '../services/companyService.js';

const AddCompany = ({ open, closeForm, onCompanyAdded }) => {
    const [formData, setFormData] = useState({
        companyName: "",
        location: "",
        foundedOn: "",
        city: ""
    });
    const [errorMsg, setErrorMsg] = useState("");
    useEffect(() => {
        if (errorMsg) {
            const timer = setTimeout(() => {
                setErrorMsg("");
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [errorMsg]);
    const handleSubmit = (event) => {
        event.preventDefault();
        const submitData = async () => {
            try {
                const result = await addCompany(formData);
                if (!result.success) {
                    setErrorMsg(result.message);
                    return;
                }
                console.log("Company Added Successfully: ",result.data);
                setFormData({
                    companyName: "",
                    location: "",
                    foundedOn: "",
                    city: ""
                });
                onCompanyAdded();
                closeForm();
                return;
            } catch (error) {
                console.log('Unexpected error:', error);
                setErrorMsg("Something went wrong. Please try again.");
                return;
            }
        }
        submitData()
    }
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }
    return (
        <Dialog open={open} onClose={closeForm} slotProps={{
            paper: {
                sx: {
                    borderRadius: '30px',
                },
            },
        }} maxWidth="xs" fullWidth>
            <div style={{
                padding: '30px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '20px',
            }}>

                {errorMsg && <p style={{
                    color: 'red', textAlign:"center",fontSize: '0.9rem',
                    marginTop: '10px', fontWeight: 'bold'
                }}>{errorMsg}</p>}
                <h1 style={{
                    fontSize: '24px',
                    fontWeight: 700,
                    color: '#222222',
                    textAlign: 'center',
                    marginBottom: '0px'
                }}>
                    Add Company
                </h1>
                <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'normal', color: "gray" }}>
                        Company Name
                    </Typography>
                    <TextField
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        variant="outlined"
                        placeholder="Enter"
                        fullWidth
                    />
                </Box>

                <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'normal', color: "gray" }}>
                        Location
                    </Typography>
                    <TextField
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        variant="outlined"
                        placeholder="Select Location"
                        fullWidth
                    />
                </Box>
                <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'normal', color: "gray" }}>
                        Founded On
                    </Typography>
                    <TextField
                        id="foundedOn"
                        name="foundedOn"
                        type="date"
                        value={formData.foundedOn}
                        onChange={handleInputChange}
                        variant="outlined"
                        placeholder='DD/MM/YYYY'
                        fullWidth
                    />
                </Box>
                <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'normal', color: "gray" }}>
                        City
                    </Typography>
                    <TextField
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        variant="outlined"
                        placeholder="Select City"
                        fullWidth
                    />
                </Box>
                <Button onClick={handleSubmit} variant="contained" sx={{ marginLeft: "35%", width: "25%", backgroundColor: '#8F00FF' }}>Save
                </Button>

            </div>
        </Dialog>
    )
}

export default AddCompany