import React, { useEffect } from 'react'
import { Box , Button} from '@mui/material'
import ReviewCard from './ReviewCard'   
import { useNavigate } from 'react-router-dom'
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { getReviewsByCompanyId } from '../services/ratingService'
import { getCompanyById } from '../services/companyService';
import CompanyReview from './CompanyReview'
const ReviewList = ({companyId}) => {
    const [reviews,setReviews] = useState([]);
    const [companyData,setCompanyData] = useState({
        companyName: "",
        location: "",
        foundedOn: "",
        city: ""
    });
    const theme = useTheme();
    const navigate = useNavigate();
    const handleClick = () => {
       return navigate('/')
    };
    useEffect(()=>{
        const fetchReviews = async () => {
            try {
                const response = await getReviewsByCompanyId(companyId);
                const companyResponse = await getCompanyById(companyId);
                if (!response.ok || !companyResponse.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const companyRes = await companyResponse.json();
                setCompanyData(companyRes);
                setReviews(data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };
        fetchReviews();
    },[reviews,companyId])
  return (
    <>
    <Box sx={{ display: "flex",flexDirection:"column",height:"100%",width:"100%", justifyContent: "center", alignItems: "center" }}>
    <CompanyReview companyId={companyId} company={companyData}/>
    {reviews.map((review) => (
        <ReviewCard key={review._id} review={review} companyId={review.companyId} />
    ))}
    <Button onClick={handleClick} variant="contained" sx={{backgroundColor:theme.palette.primary.main}}>Back to Dashboard</Button>
    </Box>
    </>
  )
}

export default ReviewList