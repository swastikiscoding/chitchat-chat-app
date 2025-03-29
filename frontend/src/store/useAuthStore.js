import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

// Fix production socket connection
const BASE_URL = import.meta.env.MODE === 'development' ? 'http://localhost:5001' : '';

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/auth/check')
            set({ authUser: res.data })
            get().connectSocket()
        } catch (error) {
            console.log("error in check auth", error)
            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true })
        console.log("signup data: ", data)
        try {
            const res = await axiosInstance.post('/auth/signup', data);
            set({ authUser: res.data })
            toast.success("Account Created Successfully")
            get().connectSocket()
        } catch (error) {
            toast.error(error.response.data.message)
        }
        finally {
            set({ isSigningUp: false })
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true })
        console.log("signup data: ", data)
        try {
            const res = await axiosInstance.post('/auth/login', data);
            set({ authUser: res.data })
            toast.success("Logged in successfully")

            get().connectSocket()
        } catch (error) {
            toast.error(error.response.data.message)
        }
        finally {
            set({ isSigningUp: false })
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post('/auth/logout')
            set({ authUser: null })
            toast.success("Logged out successfully")
            get().disconnectSocket()
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true })
        try {
            const res = await axiosInstance.put('/auth/update-profile', data)
            set({ authUser: res.data })
            toast.success('Profile updated successfully')
        } catch (error) {
            console.log("Error updating profile", error)
            toast.error(error.response.data.message);
        } finally {
            set({ isUpdatingProfile: false });
        }
    },

    connectSocket: async () => {
        const { authUser } = get()
        if (!authUser || get().socket?.connected) { return }
        
        try {
            // Create socket with better error handling and reconnection
            const socket = io(BASE_URL, {
                query: {
                    userId: authUser._id,
                },
                reconnectionAttempts: 5,
                reconnectionDelay: 1000,
                timeout: 20000,
                transports: ['websocket', 'polling']
            });
            
            // Add connection event handlers
            socket.on('connect', () => {
                console.log('Socket connected:', socket.id);
            });
            
            socket.on('connect_error', (err) => {
                console.error('Socket connection error:', err);
                toast.error('Connection to chat server failed');
            });
            
            socket.connect();
            set({ socket: socket });
            
            socket.on('getOnlineUsers', (userIds) => {
                set({onlineUsers: userIds});
            });
        } catch (error) {
            console.error('Socket connection failed:', error);
            toast.error('Could not connect to chat server');
        }
    },
    
    disconnectSocket: async () => {
        if (get().socket?.connected) get().socket.disconnect()
    }
}))