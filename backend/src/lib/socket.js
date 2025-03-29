import { Server } from "socket.io";
import http from 'http';
import express from 'express';


const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173', 'https://dwnk4mq4-5173.inc1.devtunnels.ms']
    }
})

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
    })
})

export {io, app, server}