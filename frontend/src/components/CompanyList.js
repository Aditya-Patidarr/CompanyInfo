import React from 'react'
import CompanyCard from './CompanyCard'
import { getCompaniesByCategory } from '../services/companyService';
import { useEffect, useState } from 'react';
import {Box, Button } from '@mui/material';
import { logout } from '../services/userService';
import { useNavigate } from 'react-router-dom';
const CompanyList = ({ selectedValue,refresh }) => {
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await getCompaniesByCategory(selectedValue);
          if (!response.success) {
            console.log(response.message);
            return;
          }
          setCompanies(response.data);
        } catch (error) {
          console.log('Unexpected error:', error);
        }
      }
      fetchData();
  }, [selectedValue,refresh])
  const handleClick = ()=>{
    const Logout = async () => {
      try {
        const response = await logout();
        if (!response.success) {
          console.log(response.message);
          return;
        }
        console.log(response.message);
        return navigate('/login');
      } catch (error) {
        console.log('Unexpected error:', error);
      }
    }
    Logout();
  }
  return (
    <>
      {companies && companies.map((company) => (
        <CompanyCard key={company._id} company={company} companyId={company._id} />
      ))}
      <Box sx={{display:"flex",justifyContent:"center",width:"100%"}}>
      <Button onClick={handleClick} sx={{textAlign:"center",width:"7%",marginBottom:"20px",backgroundColor:"#8F00FF"}} variant="contained">Logout</Button>
      </Box>
    </>
  )
}

export default CompanyList