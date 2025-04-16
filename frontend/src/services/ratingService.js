import { format } from "date-fns";
const API_URL = 'http://localhost:5000/api/reviews';

function sessionHandler() {
    localStorage.removeItem("token");
    window.location.href = '/login';
}


export const addReview = async ({ fullName, subject, reviewText, rating }, companyId) => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/company/${companyId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ fullName, subject, reviewText, rating }),
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
            const errorMessage = data?.errors?.[0]?.msg || "Review is not Added Successfully";
            throw new Error(errorMessage);
        }
        return { success: true, data };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

export const getReviewDataByCompanyId = async (companyId) => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/company/${companyId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        let data;
        try {
            data = await response.json();
        } catch {
            data = {};
        }
        if (!response.ok || Object.keys(data).length === 0) {
            const errorMessage = data?.errors?.[0]?.msg || "Reviews are not Available";
            throw new Error(errorMessage);
        }

        return { success: true, data }
    } catch (error) {
        return { success: false, message: error.message };
    }
}

export const getReviewsByCompanyId = async (companyId) => {
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

        let parsedData;
        try {
            parsedData = await response.json();
        } catch {
            parsedData = [];
        }
        if (!response.ok || (Array.isArray(parsedData) && parsedData.length === 0)) {
            const errorMessage = parsedData?.errors?.[0]?.msg || "Reviews are not Available";
            throw new Error(errorMessage);
        }
        const newData = parsedData.map((data) => {
            if (data.createdAt) {
                const foundedDate = new Date(data.createdAt);
                if (!isNaN(foundedDate)) {
                    const formattedDate = format(foundedDate, 'dd-MM-yyyy');
                    data.createdDate = formattedDate;
                } else {
                    data.createdDate = data.createdAt;
                }
            }
            return data;
        });
        return { success: true, data: newData };
    } catch (error) {
        return { success: false, message: error.message };
    }
}