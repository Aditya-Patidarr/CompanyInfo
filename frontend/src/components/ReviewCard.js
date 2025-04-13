import { Box, Typography,Rating } from '@mui/material'
import sampleImage from '../assets/sample.jpg';

const ReviewCard = ({ review }) => {
    return (
        <Box sx={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center", margin: "10px" }}>
            <Box sx={{ display: "flex", width: "60%", justifyContent: "center" }}>
                <Box sx={{ margin: "0px 20px" }}>
                    <img
                        style={{ height: "50px", width: "50px", borderRadius: "50%" }}
                        src={sampleImage}
                        alt="User logo"
                    />
                </Box>
                <Box display="flex" flexDirection="column">
                    <Box display="flex" flexDirection="row" justifyContent="space-between">
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                            <Typography variant="subtitle1">{review.fullName}</Typography>
                            <Typography variant="subtitle2">{review.createdAt}</Typography>
                        </Box>
                        <Box sx={{ paddingRight: "40px" }}>
                            <Rating
                                name="controlled-rating"
                                value={review.rating}
                                precision={0.5}
                                readOnly
                            />
                        </Box>
                    </Box>
                    <Box sx={{ width: "90%" }}>
                        <Typography variant="subtitle2">{review.reviewText}</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default ReviewCard;