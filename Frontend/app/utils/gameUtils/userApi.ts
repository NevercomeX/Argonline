import axios from 'axios';

const API_URL = 'https://api.example.com/auth';

export const login = async (username: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { username, password });
        return response.data;
    } catch (error) {
        throw new Error('Error logging in');
    }
};

export const register = async (username: string, password: string, email: string) => {
    try {
        const response = await axios.post(`${API_URL}/register`, { username, password, email });
        return response.data;
    } catch (error) {
        throw new Error('Error registering');
    }
};

export const getUserData = async (token: string) => {
    try {
        const response = await axios.get(`${API_URL}/user`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Error retrieving user data');
    }
};