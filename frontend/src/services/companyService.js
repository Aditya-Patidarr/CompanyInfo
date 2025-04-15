import sampleImage from '../assets/sample.jpg';
import codetech from '../assets/codetech.png';
import innogent from '../assets/innogent.png';
import pixel from '../assets/pixel.png';
import {format} from 'date-fns';
const API_URL = 'http://localhost:5000/api/companies';
const token = localStorage.getItem("token");

export const getAllCompanies = async () => {
    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching companies:', error);
    }
}

export const getCompanyById = async (companyId) => {
    try {
        const response = await fetch(`${API_URL}/${companyId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.foundedOn) {
            const foundedDate = new Date(data.foundedOn);
            if (!isNaN(foundedDate)) {
              const formattedDate = format(foundedDate, 'dd-MM-yyyy');
              data.foundedOn = formattedDate;
            } else {
              data.foundedOn = "01-01-2013"
            }
        }
        const images = [sampleImage,innogent,codetech,pixel]
        switch(data.companyName){
            case "Graffersid Web and App Development":
                data.image = sampleImage ;
                break;
            case "Code Tech Company":
                data.image = codetech ;
                break;
            case "Innogent Pvt. Ltd.":
                data.image = innogent ;
                break;
            case "Pixel Web and App Development":
                data.image = pixel ;
                break;
            default:
                let num = Math.floor(Math.random()*4);
                data.image = images[num] ;
                break;
            }
        return data;
    } catch (error) {
        console.error('Error fetching company:', error);
    }
}
export const getCompaniesByCategory = async (category) => {
    let searchopt = 'byname';
    if(category){
        searchopt = "by"+category.toLowerCase()
    }
    try {
        const response = await fetch(`${API_URL}/${searchopt}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const parsedData = await response.json();
        const images = [sampleImage,innogent,codetech,pixel]
        const newData = parsedData.map((data)=>{
            if (data.foundedOn) {
                const foundedDate = new Date(data.foundedOn);
                if (!isNaN(foundedDate)) {
                  const formattedDate = format(foundedDate, 'dd-MM-yyyy');
                  data.foundedOn = formattedDate;
                } else {
                  data.foundedOn = "01-01-2013"
                }
            }
            switch(data.companyName){
                case "Graffersid Web and App Development":
                    data.image = sampleImage ;
                    break;
                case "Code Tech Company":
                    data.image = codetech ;
                    break;
                case "Innogent Pvt. Ltd.":
                    data.image = innogent ;
                    break;
                case "Pixel Web and App Development":
                    data.image = pixel ;
                    break;
                default:
                    let num = Math.floor(Math.random()*4);
                    data.image = images[num] ;
                    break;
                }
            
            return data;
        })
        
        return newData;
    } catch (error) {
        console.error('Error fetching companies by category:', error);
    }
}

export const addCompany = async ({ companyName, foundedOn, location, city }) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                 Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ companyName, foundedOn, location, city }),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding company:', error);
    }
}