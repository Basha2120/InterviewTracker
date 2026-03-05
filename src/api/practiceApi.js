import axiosInstance from './axiosConfig';

export const getPracticeLogs = () => axiosInstance.get('/api/practice');
export const createPracticeLog = (data) => axiosInstance.post('/api/practice', data);
export const updatePracticeLog = (id, data) => axiosInstance.put(`/api/practice/${id}`, data);
export const deletePracticeLog = (id) => axiosInstance.delete(`/api/practice/${id}`);
