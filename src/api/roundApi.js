import axiosInstance from './axiosConfig';

export const getRounds = (applicationId) => axiosInstance.get(`/api/rounds/${applicationId}`);
export const addRound = (applicationId, data) => axiosInstance.post(`/api/rounds/${applicationId}`, data);
export const deleteRound = (id) => axiosInstance.delete(`/api/rounds/${id}`);
