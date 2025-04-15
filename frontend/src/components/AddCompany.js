import React from 'react'
import { Box,Typography,Dialog, TextField, Button } from '@mui/material'
import { useState } from 'react'
import {addCompany} from '../services/companyService.js';

const AddCompany = ({ open, closeForm,onCompanyAdded }) => {
    const [formData, setFormData] = useState({
        companyName: "",
        location: "",
        foundedOn: "",
        city: ""
    });
    const handleSubmit = (event) => {
        event.preventDefault();
        const submitData = async()=>{
            try{
                const response = await addCompany(formData);
                console.log(response);
            }catch(error){
                console.error('Error:', error);
            }
           
        }
        submitData().then(()=>{
            console.log('Company added successfully!');
        }).catch((error)=>{
            console.error('Error adding company:', error);
        }).finally(()=>{
            setFormData({
                companyName: "",
                location: "",
                foundedOn: "",
                city: ""
            });
            onCompanyAdded();
            closeForm();
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
                    <Typography variant="subtitle2" sx={{fontWeight: 'normal',color:"gray" }}>
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
                <Typography variant="subtitle2" sx={{ fontWeight: 'normal',color:"gray" }}>
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
                <Typography variant="subtitle2" sx={{ fontWeight: 'normal',color:"gray" }}>
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
                <Typography variant="subtitle2" sx={{fontWeight: 'normal',color:"gray" }}>
                        City
                    </Typography>
                <TextField
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    variant="outlined"
                    placeholder="Select City"
                    fullWidth
                />
                </Box>
                <Button onClick={handleSubmit} variant="contained" sx={{marginLeft:"35%" ,width: "25%", backgroundColor:'#8F00FF' }}>Save
                </Button>

            </div>
        </Dialog>
    )
}

export default AddCompany