import sampleImage from '../assets/sample.jpg';
import codetech from '../assets/codetech.png';
import innogent from '../assets/innogent.png';
import pixel from '../assets/pixel.png';
import { format } from 'date-fns';
const API_URL = 'http://localhost:5000/api/companies';

function sessionHandler() {
    localStorage.removeItem("token");
    window.location.href = '/login';
}

export const getAllCompanies = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        if (response.status === 401) {
            sessionHandler();
            return;
        }
        let data;
        try {
            data = await response.json();
        } catch {
            data = [];
        }
        if (!response.ok || (Array.isArray(data) && data.length === 0)) {
            const errorMessage = data?.errors?.[0]?.msg || "Companies are not Available";
            throw new Error(errorMessage);
        }
        return { success: true, data };
    } catch (error) {
        return { success: true, message: error.message };
    }
}

export const getCompanyById = async (companyId) => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/${companyId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        if (response.status === 401) {
            sessionHandler();
            return;
        }
        let data;
        try {
            data = await response.json();
        } catch {
            data = {};
        }
        if (!response.ok || Object.keys(data).length === 0) {
            const errorMessage = data?.errors?.[0]?.msg || "Company is not Available";
            throw new Error(errorMessage);
        }
        if (data.foundedOn) {
            const foundedDate = new Date(data.foundedOn);
            if (!isNaN(foundedDate)) {
                const formattedDate = format(foundedDate, 'dd-MM-yyyy');
                data.foundedOn = formattedDate;
            } else {
                data.foundedOn = "01-01-2013"
            }
        }
        const images = [sampleImage, innogent, codetech, pixel]
        switch (data.companyName) {
            case "Graffersid Web and App Development":
                data.image = sampleImage;
                break;
            case "Code Tech Company":
                data.image = codetech;
                break;
            case "Innogent Pvt. Ltd.":
                data.image = innogent;
                break;
            case "Pixel Web and App Development":
                data.image = pixel;
                break;
            default:
                let num = Math.floor(Math.random() * 4);
                data.image = images[num];
                break;
        }
        return { success: true, data };
    } catch (error) {
        return { success: true, message: error.message };
    }
}
export const getCompaniesByCategory = async (category) => {
    let searchopt = 'byname';
    if (category) {
        searchopt = "by" + category.toLowerCase()
    }
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/${searchopt}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        if (response.status === 401) {
            sessionHandler();
            return;
        }
        let parsedData;
        try {
            parsedData = await response.json();
        } catch {
            parsedData = [];
        }
        if (!response.ok || (Array.isArray(parsedData) && parsedData.length === 0)) {
            const errorMessage = parsedData?.errors?.[0]?.msg || "Companies are not Available";
            throw new Error(errorMessage);
        }
        const images = [sampleImage, innogent, codetech, pixel]
        const newData = parsedData.map((data) => {
            if (data.foundedOn) {
                const foundedDate = new Date(data.foundedOn);
                if (!isNaN(foundedDate)) {
                    const formattedDate = format(foundedDate, 'dd-MM-yyyy');
                    data.createdDate = formattedDate;
                } else {
                    data.createdDate = data.foundedOn;
                }
            }
            switch (data.companyName) {
                case "Graffersid Web and App Development":
                    data.image = sampleImage;
                    break;
                case "Code Tech Company":
                    data.image = codetech;
                    break;
                case "Innogent Pvt. Ltd.":
                    data.image = innogent;
                    break;
                case "Pixel Web and App Development":
                    data.image = pixel;
                    break;
                default:
                    let num = Math.floor(Math.random() * 4);
                    data.image = images[num];
                    break;
            }

            return data;
        })

        return { success: true, data: newData };
    } catch (error) {
        return { success: false, message: error.message }
    }
}

export const addCompany = async ({ companyName, foundedOn, location, city }) => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ companyName, foundedOn, location, city }),
        });
        if (response.status === 401) {
            sessionHandler();
            return;
        }
        let data;
        try {
            data = await response.json();
        } catch {
            data = {};
        }

        if (!response.ok) {
            const errorMessage = data?.errors?.[0]?.msg || "Company is not Added Successfully";
            throw new Error(errorMessage);
        }

        return { success: true, data };
    } catch (error) {
        return { success: false, message: error.message }
    }
}