const API_URL = 'http://localhost:5000/api/companies';

export const getAllCompanies = async () => {
    try {
        const response = await fetch(API_URL,{
            credentials:'include',
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
        const response = await fetch(`${API_URL}/${companyId}`,{
            credentials:'include',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching company:', error);
    }
}
export const getCompaniesByCategory = async (category) => {
    try {
        const response = await fetch(`${API_URL}/${category}`,{
            credentials:'include',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching companies by category:', error);
    }
}

export const addCompany = async ({ companyName,foundedOn,location,city }) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials:'include',
            body: JSON.stringify({ companyName,foundedOn,location,city }),
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