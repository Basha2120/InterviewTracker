import axiosInstance from './axiosConfig';

export const getAllUsers = () => axiosInstance.get('/api/admin/users');
export const adminDeleteUser = (id) => axiosInstance.delete(`/api/admin/users/${id}`);
export const getDashboard = () => axiosInstance.get('/api/dashboard');
