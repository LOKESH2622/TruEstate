import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

export const fetchSales = async (params) => {
  const response = await api.get('/sales', { params });
  return response.data;
};

export const fetchFilterOptions = async () => {
  const response = await api.get('/sales/filters');
  return response.data;
};

export const fetchSaleById = async (id) => {
  const response = await api.get(`/sales/${id}`);
  return response.data;
};

export default api;
