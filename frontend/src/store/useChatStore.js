import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { getSocket } from "../lib/socket";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async ({ text, image }) => {
    const { selectedUser, messages } = get();
    if (!selectedUser) return;

    try {
      const formData = new FormData();
      if (text) formData.append("text", text);
      if (image) formData.append("image", image);

      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Message failed");
    }
  },

  subscribeToMessages: () => {
    const socket = getSocket();
    const { selectedUser } = get();
    if (!socket || !selectedUser) return;

    socket.off("newMessage");
    socket.on("newMessage", (message) => {
      if (message.senderId !== selectedUser._id) return;
      set({ messages: [...get().messages, message] });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = getSocket();
    socket?.off("newMessage");
  },

  setSelectedUser: (user) => set({ selectedUser: user, messages: [] }),
}));
