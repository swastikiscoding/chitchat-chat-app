import { Server } from "socket.io";
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);

// Improve socket.io configuration for production
const io = new Server(server, {
    cors: {
        // In production, allow connections from the same origin
        origin: process.env.NODE_ENV === 'production' 
            ? '*' // Allow all origins in production 
            : ['http://localhost:5173', 'https://dwnk4mq4-5173.inc1.devtunnels.ms'],
        credentials: true
    },
    // Add these settings for better stability
    pingTimeout: 60000,
    pingInterval: 25000,
    transports: ['websocket', 'polling']
});

export function getReceiverSocketId(userId){
    return userSocketMap[userId];
}

const userSocketMap = {};

io.on('connection', (socket)=>{
    console.log("A user connected: ", socket.id);

    const userId = socket.handshake.query.userId;

    if(userId ){ 
        userSocketMap[userId] = socket.id;
    }

    io.emit('getOnlineUsers', Object.keys(userSocketMap))

    socket.on('disconnect', ()=>{
        console.log("A user disconnected", socket.id)
        delete userSocketMap[userId];
        // Notify other users about updated online list after disconnect
        io.emit('getOnlineUsers', Object.keys(userSocketMap));
    })
})

export {io, app, server}