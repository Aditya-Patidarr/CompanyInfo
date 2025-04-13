const API_URL = 'http://localhost:5000/api/users';
export const login = async ({email, password}) => {
    const response = await fetch(API_URL+'/login', {
        method: 'POST',
        credentials:'include',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
        throw new Error('Login failed');
    }
    
    const data = await response.json();
    return data;
}

export const register = async ({fullName,email, password}) => {
    const response = await fetch(API_URL+'/register', {
        method: 'POST',
        credentials:'include',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName,email, password }),
    });
    
    if (!response.ok) {
        throw new Error('Registration failed');
    }
    
    const data = await response.json();
    return data;
}

export const logout = async () => {
    const response = await fetch(API_URL+'/logout', {
        method: 'GET',
        credentials:'include',
    });
    
    if (!response.ok) {
        throw new Error('Logout failed');
    }
    
    return true;
}