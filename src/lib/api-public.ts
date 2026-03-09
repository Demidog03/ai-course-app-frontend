import axios, {AxiosError} from "axios";
import Cookies from "js-cookie";
import {notifications} from "@mantine/notifications";

export const apiPublic = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333/api/v1",
    headers: {
        'Content-Type': 'application/json'
    }
});

apiPublic.interceptors.response.use(
    response => response,
    (error) => {
     if (error?.response?.status === 401) {
         Cookies.remove('token');
         Cookies.remove('user');
         if (typeof window !== 'undefined') {
             window.location.href = '/login';
         }
     }
     if (error) {
         console.log(error.response?.data?.errors);
         for (const err of error.response?.data?.errors || []) {
             notifications.show({
                 color: 'red',
                 title: 'Error',
                 message: err.message,
             })
         }
     }
     return Promise.reject(error);
    });