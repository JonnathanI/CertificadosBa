// src/api/axios.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8081', // URL de tu backend
  //baseURL: 'https://certificados.sudamericano.edu.ec/api', // URL de tu backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el JWT al encabezado de autorización
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
