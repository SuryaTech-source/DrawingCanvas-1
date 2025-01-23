const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// MongoDB connection
// mongoose.connect('mongodb://localhost:27017/drawingApp', { useNewUrlParser: true, useUnifiedTopology: true });

// WebSocket connection handling
wss.on('connection', (ws) => {
    console.log('A user connected');
  
    ws.on('message', (message) => {
      try {
        const data = JSON.parse(message);
  
        if (data.type === 'reset') {
          console.log('Reset event triggered');
          // Broadcast the reset event to all clients
          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({ type: 'reset' }));
            }
          });
        } else {
          // Broadcast drawing data to all clients except the sender
          wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify(data));
            }
          });
        }
      } catch (err) {
        console.error('Error processing message:', err.message);
      }
    });
  
    ws.on('close', () => {
      console.log('A user disconnected');
    });
  });
  

app.get('/', (req, res) => res.send('WebSocket server is running'));

// Start the server
server.listen(3000, () => console.log('Server started on port 3000'));
