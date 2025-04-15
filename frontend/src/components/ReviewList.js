import React, { useEffect } from 'react'
import { Box} from '@mui/material'
import { useState } from 'react';
import { getReviewsByCompanyId } from '../services/ratingService'
import { getCompanyById } from '../services/companyService';
import CompanyReview from './CompanyReview'
import { useLocation } from 'react-router-dom';
const ReviewList = () => {
    const location = useLocation();
    const { companyId } = location.state || {};
    
    const [reviews,setReviews] = useState([]);
    const [companyData,setCompanyData] = useState({
        companyName: "",
        location: "",
        foundedOn: "",
        city: ""
    });
    useEffect(()=>{
        const fetchReviews = async () => {
            try {
                const response = await getReviewsByCompanyId(companyId);
                const companyResponse = await getCompanyById(companyId);
                if (!response || !companyResponse) {
                    throw new Error('Network response was not ok');
                }
                console.log("response: ",response);
                console.log("companyresponse: ",companyResponse);
                setCompanyData(companyResponse);
                setReviews(response);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };
        fetchReviews();
    },[reviews,companyId])
  return (
    <>
    <Box sx={{ display: "flex",flexDirection:"column",height:"100%",width:"100%", justifyContent: "center", alignItems: "center" }}>
    <CompanyReview companyId={companyId} company={companyData} reviews={reviews}/>
    </Box>
    </>
  )
}

export default ReviewList