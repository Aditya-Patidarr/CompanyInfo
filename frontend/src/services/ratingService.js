const API_URL = 'http://localhost:5000/api/reviews';
const token = localStorage.getItem("token");

export const addReview = async ({ fullName, subject, reviewText, rating }, companyId) => {
    try {
        const response = await fetch(`${API_URL}/company/${companyId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ fullName, subject, reviewText, rating }),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding review:', error);
    }
}

export const getReviewDataByCompanyId = async (companyId) => {
    try {
        const response = await fetch(`${API_URL}/company/${companyId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        if (!response) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching reviews:', error);
    }
}

export const getReviewsByCompanyId = async(companyId)=>{
    try {
        const response = await fetch(`${API_URL}/${companyId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        if (!response) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching reviews:', error);
        
    }
}