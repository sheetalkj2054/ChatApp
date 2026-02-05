import { io } from "socket.io-client";

let socket = null;

export const connectSocket = (userId) => {
  if (socket) return socket;

  socket = io(import.meta.env.VITE_BACKEND_URL, {
  withCredentials: true,
  auth: { userId },
  transports: ["websocket"],
});


  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => socket;
