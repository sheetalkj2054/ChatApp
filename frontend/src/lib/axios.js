export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development"
    ? "http://localhost:5001/api"
    : "https://chatapp-backend-zw5s.onrender.com/api",
  withCredentials: true,
});
