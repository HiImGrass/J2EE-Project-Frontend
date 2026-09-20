// import axios from 'axios'

// const api = axios.create({
//     baseURL: import.meta.env.VITE_APP_API_URL,
//     timeout: 10000,
//     headers: {
//         "Content-Type": "application/json"
//     },
// });

// export default api;

import axios from 'axios';

export const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
    withCredentials: false, // tạm đặt false
});

// debug
console.log("Current API Base URL:", axiosClient.defaults.baseURL);

// Response interceptor để bóc tách data gọn hơn
axiosClient.interceptors.response.use(
    (response) => response.data,
    (error) => {
        // Xử lý lỗi chung (token hết hạn, 401, 500,...)
        return Promise.reject(error?.response?.data || error);
    }
);