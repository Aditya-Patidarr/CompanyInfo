import React from 'react'
import CompanyCard from './CompanyCard'
import { getAllCompanies } from '../services/companyService';
import { useEffect, useState } from 'react';
const CompanyList = () => {
  const [companies,setCompanies] = useState([]);
  useEffect(()=>{
          const fetchCompanies = async () => {
              try {
                  const response = await getAllCompanies();
                  console.log(response);
                  if(!response){
                    throw new Error('There are no companies available!');
                  }
                  if (!response.ok) {
                      throw new Error('Network response was not ok');
                  }
                  const data = await response.json();
                  setCompanies(data);
              } catch (error) {
                  console.error('Error fetching companies:', error);
              }
          };
          fetchCompanies();
      },[companies])
  return (
    <>
    {companies && companies.map((company) => (
        <CompanyCard key={company._id} company={company} />
    ))}
    </>
  )
}

export default CompanyList