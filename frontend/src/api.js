import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

const apiUrl =
  "https://b5644af6-37fb-45a3-9d6a-ef42087e1027-dev.e1-us-east-azure.choreoapis.dev/memocards/backend/v1.0";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiUrl,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
