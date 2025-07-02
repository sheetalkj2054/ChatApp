// frontend/src/lib/socket.js
import { io } from "socket.io-client";

const userId = localStorage.getItem("userId"); // adjust this if you use Zustand or context

export const socket = io(import.meta.env.VITE_SOCKET_URL, {
  withCredentials: true,
  query: {
    userId,
  },
});
