import { Typography, CardContent, Card, CardMedia, Box, Button, Rating } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getReviewDataByCompanyId } from '../services/ratingService';
import AddReview from './AddReview';
import ReviewCard from './ReviewCard';
import { useNavigate } from 'react-router-dom';
const CompanyReview = ({ companyId, company, reviews }) => {
  const navigate = useNavigate();
  const [reviewData, setReviewData] = useState([]);
  const [open, setOpen] = useState(false);
  const closeForm = () => {
    setOpen(false);
  }
  const handleClick = () => {
    setOpen(true);
  }
  const handleButton = () => {
    return navigate('/layout')
  };
  useEffect(() => {
    const fetchReviewData = async () => {
      try {
        const response = await getReviewDataByCompanyId(companyId);
        if (!response) {
          throw new Error('Network response was not ok');
        }
        setReviewData(response);
      } catch (error) {
        console.error('Error fetching review:', error);
      }
    };
    fetchReviewData();
  }, [companyId, reviews])
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "center", alignItems: "center", margin: "30px" }}>
        <Card sx={{ display: 'flex', flexDirection: 'column', width: "60%", padding: "30px", boxShadow: 3 }}>
          <Box sx={{ display: "flex", width: "100%", padding: "0px 10px", marginRight: "10px", justifyContent: "space-between", boxShadow: 1 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <CardMedia
                component="img"
                sx={{ height: 100, width: 100 }}
                image={company.image}
                alt="Company Logo"
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <CardContent sx={{ paddingTop: "15px", marginBottom: "20px" }}>
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
                <Box sx={{ display: 'flex', alignItems: "center", pl: 1, gap: "8px", pb: "20px" }}>
                  <Box>
                    <p style={{ fontWeight: 'bold' }}>{reviewData.averageRating}</p>
                  </Box>
                  <Box>
                    <Rating
                      name="rating"
                      value={reviewData.averageRating ?? 1}
                      precision={0.5}
                      sx={{ paddingBottom: "0px" }}
                      readOnly
                    />
                  </Box>
                  <Box>
                    <span style={{ fontWeight: 'bold' }}>{reviewData.totalRatings} Reviews</span>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: 'space-between' }}>
              <Typography variant="subtitle2" sx={{ margin: "10px 0px", color: "grey" }}>
                Founded On {company.foundedOn}
              </Typography>
              <Button onClick={handleClick} variant="contained" sx={{ backgroundColor: "	#3f3f3f", margin: "20px 0px" }}>
                Add Review
              </Button>
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
            {reviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
            <Button onClick={handleButton} variant="contained" sx={{ backgroundColor: '#8F00FF' }}>Back to Dashboard</Button>
          </Box>
        </Card>
      </Box>
      <AddReview open={open} closeForm={closeForm} companyId={companyId} />
    </>
  );
}

export default CompanyReview;