import axios from "axios";

const TOKEN_KEY = 'sc_access_token';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Attach Bearer token to every request when available
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});

//Unwrap backend error messages into plain Error objects
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error.response?.data?.message || error.message || "An unknown error occurred";
        return Promise.reject(new Error(message));
    }
);

export default axiosInstance;
export { TOKEN_KEY };