import axios from "axios"; // ✅ This line is required

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development"
    ? "http://localhost:5001/api"
    : "/api",
  withCredentials: true,
});
