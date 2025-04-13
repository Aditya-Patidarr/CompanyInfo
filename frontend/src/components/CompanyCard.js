import { Typography, CardContent, CardMedia, Box, Button, Rating } from '@mui/material'
import React, { useEffect, useState } from 'react'
import sampleImage from '../assets/sample.jpg';
import { useNavigate } from 'react-router-dom';
import { getReviewsByCompanyId } from '../services/ratingService.js';

const CompanyCard = ({ company, companyId }) => {
  const [reviewData, setReviewData] = useState([]);
  const navigate = useNavigate();

  const handleClick = () => {
    return navigate('/review')
  }
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await getReviewsByCompanyId(companyId);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setReviewData(data);
      } catch (error) {
        console.error('Error fetching company:', error);
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
              image={sampleImage}
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
              <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                <span>{reviewData.averageRating}</span>
                <Rating
                  name="controlled-rating"
                  value={reviewData.averageRating}
                  precision={0.5}
                  readOnly
                />
                <span>{reviewData.numberOfReviews}</span>
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: 'space-between' }}>
            <Typography variant="subtitle2" sx={{ margin: "10px 0px", color: "grey" }}>
              {company.foundedOn}
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