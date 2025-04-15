import React from 'react'
import CompanyCard from './CompanyCard'
import { getCompaniesByCategory } from '../services/companyService';
import { useEffect, useState } from 'react';
const CompanyList = ({ selectedValue,refresh }) => {
  const [companies, setCompanies] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await getCompaniesByCategory(selectedValue);
          if (!response) {
            throw new Error('Network response was not ok');
          }
          setCompanies(response);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
      fetchData();
  }, [selectedValue,refresh])
  return (
    <>
      {companies && companies.map((company) => (
        <CompanyCard key={company._id} company={company} companyId={company._id} />
      ))}
    </>
  )
}

export default CompanyList