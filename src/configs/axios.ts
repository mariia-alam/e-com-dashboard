import axios from 'axios';
export const loginBaseURL = 'https://reqres.in/';
export const baseURL = 'https://dummyjson.com/';
const token = localStorage.getItem('authToken');

const apiClient = axios.create({
        // baseURL: token ?  baseURL : loginBaseURL,
        headers: {
            'x-api-key': 'reqres-free-v1',
            "Accept-Language": localStorage.getItem("lang") ?? "en",
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            "Pragma": "no-cache"
        },
    });

apiClient.interceptors.request.use((config) => {
        config.headers["Authorization"]  = `Bearer ${token}`;
        config.headers["lang"] = localStorage.getItem("lang");
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
    );

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.log("error", error);
        if (error.response) {
        console.log("error.response", error.response.data);
        if (error.response.status === 401) {
            // your_session_expired
            // Redirect to login
        } else {
            // Handle other response errors
            console.error("Response error:", error.response);
        }
        } else if (error.request) {
        // Handle request error
        console.error("Request error:", error?.request);
        } else {
        // Handle other errors
        console.error("Error:", error.message);
        }
        return Promise.reject(error?.response?.data);
    }
    );

const { get, post, put, patch, delete: destroy } = apiClient;
export { get, post, put, destroy, patch };

export default apiClient;
