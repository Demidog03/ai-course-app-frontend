import axios, {AxiosError} from "axios";
import Cookies from "js-cookie";
import {notifications} from "@mantine/notifications";

export const apiPrivate = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333/api/v1",
    headers: {
        'Content-Type': 'application/json'
    }
});

apiPrivate.interceptors.request.use(config => {
    const token = Cookies.get('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

apiPrivate.interceptors.response.use(
    response => response,
    (error) => {
        if (error?.response?.status === 401) {
            Cookies.remove('token');
            Cookies.remove('user');
            if (typeof window !== 'undefined') {
                window.location.href = '/login';
            }
        }
        if (error instanceof AxiosError) {
            console.error('Axios error:', error.message);
            for (const err of error.response?.data?.errors || []) {
                notifications.show({
                    title: 'Error',
                    message: err.message,
                })
            }
        }
        return Promise.reject(error);
    });