import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://chatapp-backend-zw5s.onrender.com/api",
  withCredentials: true,
});
