import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        // Add connection options to prevent timeouts
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 15000,
            socketTimeoutMS: 45000,
            family: 4,
            maxPoolSize: 10,
            retryWrites: true
        });
        
        console.log(`MongoDB connected: ${conn.connection.host}`);
        
        // Handle connection errors
        mongoose.connection.on('error', err => {
            console.log('MongoDB connection error:', err);
        });
        
        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected, attempting to reconnect...');
        });
        
        return conn;
    }
    catch (err) {
        console.log(`MongoDB connection error: ${err}`);
        throw err;
    }
}