const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Allowed origins
const allowedOrigins = ['https://drawing-canvas-1frontend.vercel.app', 'http://localhost:4200'];

// CORS middleware for HTTP requests
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  })
);

// WebSocket connection handling
wss.on('connection', (ws, req) => {
  const origin = req.headers.origin;
  if (!allowedOrigins.includes(origin)) {
    console.log(`Connection from origin ${origin} not allowed`);
    ws.close();
    return;
  }

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
