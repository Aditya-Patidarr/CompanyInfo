const API_URL = 'http://localhost:5000/api/users';
export const login = async ({ email, password }) => {
    try {
        const response = await fetch(API_URL + '/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        let data;
        try {
            data = await response.json();
        } catch {
            data = {};
        }

        if (!response.ok) {
            const errorMessage = data?.errors?.[0]?.msg || "Login failed";
            throw new Error(errorMessage);
        }
        localStorage.setItem("token", data.token);
        return { success: true, data };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

export const register = async ({ fullName, email, password }) => {
    try {
        const response = await fetch(API_URL + '/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fullName, email, password }),
        });

        let data;
        try {
            data = await response.json();
        } catch {
            data = {};
        }
        if (!response.ok) {
            const errorMessage = data?.errors?.[0]?.msg || "Registration failed";
            throw new Error(errorMessage);
        }

        localStorage.setItem("token", data.token);
        return { success: true, data };
    } catch (error) {
        return { success: false, message: error.message };
    }
};


export const logout = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(API_URL + '/logout', {
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
        if (!response.ok) {
            const errorMessage = data?.errors?.[0]?.msg || "Logging Out failed";
            throw new Error(errorMessage);
        }
        localStorage.removeItem("token");
        return { success: true, message: "Logged Out Successfully" };
    } catch (error) {
        return { success: false, message: error.message };
    }
}