const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const userRoutes = require('./route/userRoutes.js');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Middleware

app.use(cors({origin:'*',})); // Enable CORS for all origins
app.use(express.json()); 

app.use(bodyParser.json()); // For parsing JSON request bodies
app.use('/api/users', userRoutes); // Register user routes

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/drawingApp', { useNewUrlParser: true, useUnifiedTopology: true });

// WebSocket connection handling
wss.on('connection', (ws) => {
  console.log('A user connected');

  // Notify all clients about the new connection
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ type: 'notification', message: 'A new user has joined' }));
    }
  });

  ws.on('message', (message) => {
    // Existing message handling logic here...
  });

  ws.on('close', () => {
    console.log('A user disconnected');

    // Notify all clients about the disconnection
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: 'notification', message: 'A user has left' }));
      }
    });
  });
});

app.get('/', (req, res) => res.send('WebSocket server is running'));

// Start the server
server.listen(3000, () => console.log('Server started on port 3000'));
