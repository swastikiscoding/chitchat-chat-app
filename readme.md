# ChitChat - Real-time Chat Application

ChitChat is a modern, real-time chat application built with the MERN stack (MongoDB, Express, React, Node.js) and Socket.IO for real-time communication.

![ChitChat App](https://i.imgur.com/YOUR_IMAGE_ID.png) <!-- Replace with actual application screenshot -->

## Features

- **Real-time messaging** - Instant message delivery using Socket.IO
- **User authentication** - Secure signup and login functionality
- **Online status indicators** - See which users are currently online
- **Profile customization** - Upload and update profile pictures
- **Image sharing** - Send images in chat conversations
- **Responsive design** - Works on both desktop and mobile devices

## Tech Stack

### Frontend
- React.js - UI library
- Zustand - State management
- TailwindCSS & DaisyUI - Styling
- Socket.IO Client - Real-time communication
- React Router - Navigation
- Axios - API requests
- React Hot Toast - Notifications

### Backend
- Node.js & Express - Server framework
- MongoDB & Mongoose - Database
- Socket.IO - Real-time communication
- JWT & Cookie-based Authentication
- Bcrypt - Password hashing
- Cloudinary - Image storage

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- MongoDB (local or Atlas URI)
- Cloudinary account for image storage

### Environment Variables
Create a `.env` file in the backend directory with the following variables:

```
PORT=5001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NODE_ENV=development
```

### Installation & Setup

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/chitchat-chat-app.git
   cd chitchat-chat-app
   ```

2. Install backend dependencies
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies
   ```bash
   cd ../frontend
   npm install
   ```

4. Start development servers

   In the backend directory:
   ```bash
   npm run dev
   ```

   In the frontend directory:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
ChitChat Chat App/
├── backend/                # Backend codebase
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── lib/            # Utility functions
│   │   ├── middleware/     # Express middleware
│   │   ├── models/         # Mongoose models
│   │   └── routes/         # API routes
│   └── package.json        # Backend dependencies
│
├── frontend/               # Frontend codebase
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── lib/            # Utility functions
│   │   ├── pages/          # Page components
│   │   └── store/          # Zustand stores
│   └── package.json        # Frontend dependencies
│
└── package.json            # Root package.json for deployment
```
