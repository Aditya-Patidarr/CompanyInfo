import { Box, Typography, Rating } from '@mui/material'
import userdemo from '../assets/userdemo.jpg';
import { useEffect } from 'react';

const ReviewCard = ({ review }) => {
    useEffect(() => {
    }, [review]);
    return (
        <Box sx={{ display: "flex", width: "100%", height: "150px", justifyContent: "center", alignItems: "center",padding:"0px",marginTop:"0px",paddingRight:"10px" }}>
            <Box sx={{display:'flex',justifyContent:"space-between"}}>
                <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                    <Box sx={{ margin: "0px 20px" }}>
                        <img
                            style={{ height: "50px", width: "50px", borderRadius: "50%" }}
                            src={userdemo}
                            alt="User logo"
                        />
                    </Box>
                    <Box display="flex" flexDirection="column">
                        <Box display="flex" flexDirection="row" justifyContent="space-between">
                            <Box sx={{ display: "flex", flexDirection: "column" }}>
                                <Typography variant="subtitle1">{review.fullName}</Typography>
                                <Typography variant="subtitle2">{review.createdDate}</Typography>
                            </Box>
                        </Box>
                        <Box sx={{ width: "100%" }}>
                            <Typography variant="subtitle2">{review.reviewText}</Typography>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{paddingRight: "40px" }}>
                    <Rating
                        name="rating"
                        value={review.rating ?? 0}
                        precision={0.5}
                        readOnly
                    />
                </Box>
            </Box>
        </Box>
    )
}

export default ReviewCard;