const API_URL = 'http://localhost:5000/api/users';
export const login = async ({ email, password }) => {
    const response = await fetch(API_URL + '/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }

    const data = await response.json();
    console.log(data);
    localStorage.setItem("token",data.token);
    return data;
}

export const register = async ({ fullName, email, password }) => {
    const response = await fetch(API_URL + '/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName, email, password }),
    });

    if (!response.ok) {
        throw new Error('Registration failed');
    }

    const data = await response.json();
    return data;
}

export const logout = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(API_URL + '/logout', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    if (!response.ok) {
        throw new Error('Logout failed');
    }
    localStorage.setItem("token",null);
    return true;
}