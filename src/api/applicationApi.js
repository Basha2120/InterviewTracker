import axiosInstance from './axiosConfig';

export const getApplications = (params) => axiosInstance.get('/api/applications', { params });
export const createApplication = (data) => axiosInstance.post('/api/applications', data);
export const updateApplication = (id, data) => axiosInstance.put(`/api/applications/${id}`, data);
export const deleteApplication = (id) => axiosInstance.delete(`/api/applications/${id}`);
