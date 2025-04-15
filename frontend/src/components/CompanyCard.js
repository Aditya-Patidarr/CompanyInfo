import { Typography, CardContent, CardMedia, Box, Button, Rating } from '@mui/material'
import React, { useEffect, useState } from 'react'

// import pixel from '../assets/sample.jpg';
import { useNavigate } from 'react-router-dom';
import { getReviewDataByCompanyId } from '../services/ratingService.js';

const CompanyCard = ({company,companyId }) => {
  const [reviewData, setReviewData] = useState({
    averageRating:0,
    numberOfReviews:0
  });
  const navigate = useNavigate();

  const handleClick = () => {
    return navigate('/review', {
      state: {
        from: 'companyCard', 
        companyId: companyId
      }
    });
    
  }
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await getReviewDataByCompanyId(companyId);
        if (!response) {
          throw new Error('No available companies');
        }   
        setReviewData({
          averageRating:response.averageRating,
          numberOfReviews:response.totalRatings
        });
      } catch (error) {
        console.log('Error fetching company:', error);
      }
    };
    fetchCompany();
  }, [companyId])
  
  return (
    <>
    
      <Box sx={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center", margin: "40px" }}>
        <Box sx={{ display: "flex", width: "65%", padding: "10px", justifyContent: "space-between", boxShadow: 1 }}>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <CardMedia
              component="img"
              sx={{ width: 151 }}
              image={company.image}
              alt="Company Logo"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <CardContent sx={{ paddingTop: 0, marginBottom: "20px" }}>
                <Typography component="div" variant="h6" sx={{ fontWeight: 'bold' }}>
                  {company.companyName}
                </Typography>
                <Typography
                  variant="subtitle2"
                  component="div"
                  sx={{ color: 'text.secondary' }}
                >
                  {company.location}
                </Typography>
              </CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1, gap:"8px" }}>
                <span style={{fontWeight:'bold'}}>{reviewData.averageRating}</span>
                <Rating
                  name="rating"
                  value={reviewData.averageRating ?? 1}
                  precision={0.5}
                  readOnly
                />
                <span style={{fontWeight:'bold'}}>{reviewData.numberOfReviews} Reviews</span>
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: 'space-between' }}>
            <Typography variant="subtitle2" sx={{ margin: "10px 0px", color: "grey" }}>
            Founded On {company.foundedOn}
            </Typography>
            <Button onClick={handleClick} variant="contained" sx={{ backgroundColor: "	#3f3f3f", margin: "20px 0px" }}>
              Detail Review
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default CompanyCard