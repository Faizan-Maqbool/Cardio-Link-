import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Update this to match your Vite dev server port
    methods: ["GET", "POST"]
  }
});

const users = new Map();
const rooms = new Map();

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('user_connected', ({ userId, role }) => {
    users.set(socket.id, { userId, role });
    
    // Join a common room for doctor-patient communication
    const roomName = 'chat_room';
    socket.join(roomName);
    rooms.set(socket.id, roomName);
    
    io.to(roomName).emit('user_status', {
      userId,
      role,
      status: 'online'
    });
    
    console.log(`${role} joined room: ${roomName}`);
  });

  socket.on('send_message', (messageData) => {
    const user = users.get(socket.id);
    const room = rooms.get(socket.id);
    
    if (user && room) {
      const enhancedMessage = {
        ...messageData,
        id: Date.now(), // Ensure unique IDs
        sender: user.role,
        userId: user.userId,
        time: new Date().toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        read: false
      };
      
      // Emit to all users in the room, including sender
      io.to(room).emit('receive_message', enhancedMessage);
      console.log(`Message sent in room ${room}:`, enhancedMessage);
    }
  });

  socket.on('disconnect', () => {
    const user = users.get(socket.id);
    const room = rooms.get(socket.id);
    
    if (user && room) {
      io.to(room).emit('user_status', {
        userId: user.userId,
        role: user.role,
        status: 'offline'
      });
      
      users.delete(socket.id);
      rooms.delete(socket.id);
    }
    
    console.log('User disconnected:', socket.id);
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




