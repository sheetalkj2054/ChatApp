// frontend/src/lib/axios.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || ""; 

// create and export the instance
export const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,      // so cookies/tokens are sent
  headers: { "Content-Type": "application/json" },
});
