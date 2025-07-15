import { BASE_URL } from '@/constants/APIs';
import { getAccessToken } from '@/store/auth';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

export default axiosInstance;
