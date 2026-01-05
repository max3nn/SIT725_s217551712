// Server bootstrap with Socket.IO for real-time task collaboration
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const path = require('path');
const Task = require('./models/task.model');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 3000;
const MONGODB_URI = 'mongodb://localhost:27017/taskboard';

// Track connected users
let connectedUsers = 0;

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// REST API endpoints for initial data load
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  connectedUsers++;
  console.log(`User connected. Total users: ${connectedUsers}`);
  
  // Broadcast updated user count to all clients
  io.emit('userCount', connectedUsers);

  // Handle new task creation
  socket.on('createTask', async (taskData) => {
    try {
      const task = new Task({
        title: taskData.title,
        description: taskData.description,
        priority: taskData.priority,
        createdBy: taskData.createdBy || 'Anonymous'
      });
      
      const savedTask = await task.save();
      
      // Broadcast new task to ALL connected clients
      io.emit('taskCreated', savedTask);
      console.log(`Task created: ${savedTask.title}`);
    } catch (error) {
      socket.emit('error', { message: 'Failed to create task' });
    }
  });

  // Handle task status update
  socket.on('updateTaskStatus', async (data) => {
    try {
      const task = await Task.findByIdAndUpdate(
        data.taskId,
        { status: data.status, updatedAt: Date.now() },
        { new: true }
      );
      
      if (task) {
        // Broadcast updated task to ALL connected clients
        io.emit('taskUpdated', task);
        console.log(`Task status updated: ${task.title} -> ${data.status}`);
      }
    } catch (error) {
      socket.emit('error', { message: 'Failed to update task' });
    }
  });

  // Handle task deletion
  socket.on('deleteTask', async (taskId) => {
    try {
      const task = await Task.findByIdAndDelete(taskId);
      
      if (task) {
        // Broadcast deletion to ALL connected clients
        io.emit('taskDeleted', taskId);
        console.log(`Task deleted: ${task.title}`);
      }
    } catch (error) {
      socket.emit('error', { message: 'Failed to delete task' });
    }
  });

  // Handle user typing indicator
  socket.on('userTyping', (username) => {
    // Broadcast to other users that someone is typing
    socket.broadcast.emit('userTyping', username);
  });

  // Handle user stopped typing
  socket.on('userStoppedTyping', () => {
    socket.broadcast.emit('userStoppedTyping');
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    connectedUsers--;
    console.log(`User disconnected. Total users: ${connectedUsers}`);
    io.emit('userCount', connectedUsers);
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log('Real-time task board with Socket.IO ready!');
});
