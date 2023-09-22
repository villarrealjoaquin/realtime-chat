import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.ts';
import bodyParser from 'body-parser';
import { Server } from 'socket.io';

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
  origin: 'http://localhost:5173'
}));

// app.use(bodyParser.json());
app.use(express.json());
app.use('/api', authRoutes);

export default server;
