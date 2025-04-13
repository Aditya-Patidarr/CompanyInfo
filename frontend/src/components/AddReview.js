import React from 'react'
import { Box, Typography, Dialog, TextField, Button, Rating } from '@mui/material'
import { useState } from 'react'
import { useTheme } from '@mui/material/styles'
import { addReview } from '../services/ratingService.js';
const AddReview = ({ open, closeForm }) => {
    const theme = useTheme();
    const [formData, setFormData] = useState({
        fullName: "",
        subject: "",
        reviewText: "",
        rating: 0
    });
    const handleSubmit = (event) => {
        event.preventDefault();
        const submitData = async () => {
            try {
                const response = await addReview(formData);
                console.log(response);
                console.log('Review added successfully!');
            } catch (error) {
                console.error('Error adding review:', error);
            }

        }
        submitData();
        setFormData({
            fullName: "",
            subject: "",
            reviewText: "",
            rating: 0
        });
        closeForm();
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
                        name="controlled-rating"
                        value={formData.rating}
                        precision={0.5}
                        onChange={handleInputChange}
                    />
                </Box>
                <Button onClick={handleSubmit} variant="contained" sx={{ marginLeft: "35%", width: "25%", backgroundColor: theme.palette.primary.main }}>Save
                </Button>

            </div>
        </Dialog>
    )
}

export default AddReview;