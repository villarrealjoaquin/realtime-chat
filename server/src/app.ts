import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser'
import { authRoutes, chatRoutes, conversationRoutes } from './routes';
dotenv.config();

const app = express();
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173"
  }
});

io.on('connection', (socket) => {
  console.log('new user connected');
  socket.on('chat-message', (message) => {
    socket.broadcast.emit('chat-message', message);
  })
});

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api', authRoutes);
app.use('/api', chatRoutes);
app.use('/api', conversationRoutes);

export default server;
