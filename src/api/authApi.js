import axiosInstance from './axiosConfig';

export const register = (data) => axiosInstance.post('/api/auth/register', data);
export const login = (data) => axiosInstance.post('/api/auth/login', data);
