import React from 'react'
import { Box, Typography, Dialog, TextField, Button, Rating } from '@mui/material'
import { useState,useEffect } from 'react'
import { addReview } from '../services/ratingService.js';
const AddReview = ({ open, closeForm ,companyId}) => {
    const [formData, setFormData] = useState({
        fullName: "",
        subject: "",
        reviewText: "",
        rating: 0
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
                const result = await addReview(formData,companyId);
                if (!result.success) {
                    setErrorMsg(result.message); 
                    return;
                }
                console.log('Review added Successfully: ',result.data);
                setFormData({
                    fullName: "",
                    subject: "",
                    reviewText: "",
                    rating: 0
                });
                closeForm();
                return;
            } catch (error) {
                console.log('Unexpected error:', error);
                setErrorMsg("Something went wrong. Please try again.");
                return;
            }
        }
        submitData();
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
                    color: 'red', fontSize: '0.9rem',
                    marginTop: '10px', fontWeight: 'bold'
                }}>{errorMsg}</p>}
                <h1 style={{
                    fontSize: '24px',
                    fontWeight: 700,
                    color: '#222222',
                    textAlign: 'center',
                    marginBottom: '0px'
                }}>
                    Add Review
                </h1>
                <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'normal', color: "gray" }}>
                        Full Name
                    </Typography>
                    <TextField
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        variant="outlined"
                        placeholder="Enter"
                        fullWidth
                    />
                </Box>

                <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'normal', color: "gray" }}>
                        Subject
                    </Typography>
                    <TextField
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        variant="outlined"
                        placeholder="Enter"
                        fullWidth
                    />
                </Box>

                <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'normal', color: "gray" }}>
                        Enter your Review
                    </Typography>
                    <TextField
                        id="reviewText"
                        name="reviewText"
                        type="text"
                        value={formData.reviewText}
                        onChange={handleInputChange}
                        variant="outlined"
                        placeholder='Description'
                        fullWidth
                    />
                </Box>
                <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'normal', color: "gray" }}>
                        Rating
                    </Typography>
                    <Rating
                        name="rating"
                        value={formData.rating ?? 0}
                        precision={0.5}
                        onChange={handleInputChange}
                    />
                </Box>
                <Button onClick={handleSubmit} variant="contained" sx={{ marginLeft: "35%", width: "25%", backgroundColor: '#8F00FF' }}>Save
                </Button>

            </div>
        </Dialog>
    )
}

export default AddReview;