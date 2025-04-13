const API_URL = 'http://localhost:5000/api/rating';

export const addReview = async ({fullName,subject, reviewText, rating},companyId) => {
    try {
        const response = await fetch(`${API_URL}/company/${companyId}`, {
            method: 'POST',
            credentials:'include',
            headers: {
                'Content-Type': 'application/json',
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

export const getReviewsByCompanyId = async (companyId) => {
    try {
        const response = await fetch(`${API_URL}/company/${companyId}`,{
            credentials:'include',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching reviews:', error);
    }
}