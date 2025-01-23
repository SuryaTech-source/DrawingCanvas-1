
# Collaborative Drawing Application

This is a real-time collaborative drawing application where multiple users can draw on a shared canvas, register/login, and interact with each other via notifications. The project features a WebSocket-powered backend and an Angular-based frontend.

---

## Features

1. **Real-Time Drawing**:
   - Users can draw on a shared canvas, and the updates are synchronized across all connected clients in real-time.

2. **User Authentication**:
   - Register and login functionality to track users.
   - Secure user sessions stored in `localStorage`.

3. **Canvas Reset**:
   - Reset the canvas for all connected clients.

4. **Notifications**:
   - Notifications for user connections and disconnections.

5. **Dynamic Header**:
   - Displays "Login" or "Logout" based on user authentication status.

---

## Technology Stack

### Backend
- Node.js
- Express.js
- WebSocket
- MongoDB with Mongoose

### Frontend
- Angular
- HTML/CSS/SCSS
- WebSocket for real-time communication

---

## Installation

### Prerequisites
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Angular CLI](https://angular.io/cli)

### Backend Setup
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd collaborative-drawing-app/backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the MongoDB server:
   ```bash
   mongod
   ```
4. Start the backend server:
   ```bash
   node server.js
   ```
   The backend server runs on `http://localhost:3000`.

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd collaborative-drawing-app/frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Angular development server:
   ```bash
   ng serve
   ```
   The frontend server runs on `http://localhost:4200`.

---

## API Endpoints

### User Authentication
#### **Register User**
- **Endpoint**: `POST /api/users/register`
- **Request Body**:
  ```json
  {
    "username": "example",
    "password": "password123",
    "email": "example@example.com"
  }
  ```
- **Response**:
  ```json
  {
    "message": "User registered successfully."
  }
  ```

#### **Login User**
- **Endpoint**: `POST /api/users/login`
- **Request Body**:
  ```json
  {
    "username": "example",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Login successful",
    "user": {
      "username": "example",
      "email": "example@example.com"
    }
  }
  ```

---

## WebSocket Events

### **Drawing Event**
- **Type**: `drawing`
- **Payload**:
  ```json
  {
    "x": 150,
    "y": 200,
    "brushSize": 5,
    "brushColor": "#000000"
  }
  ```

### **Reset Event**
- **Type**: `reset`
- **Payload**:
  ```json
  {
    "type": "reset"
  }
  ```

### **Notification Event**
- **Type**: `notification`
- **Payload**:
  ```json
  {
    "type": "notification",
    "message": "A new user has joined."
  }
  ```

---

## File Structure

### Backend
```
backend/
├── controllers/
│   └── userController.js    # Login and register logic
├── models/
│   └── user.js              # User schema
├── routes/
│   └── userRoutes.js        # Routes for authentication
├── server.js                # Main server entry point
└── package.json             # Backend dependencies
```

### Frontend
```
frontend/
├── src/app/
│   ├── components/
│   │   ├── canvas/          # Canvas for drawing
│   │   ├── header/          # Header component
│   │   └── login/           # Login/Register component
│   └── services/
│       └── web-socket.service.ts # WebSocket logic
├── proxy.conf.json          # Proxy for backend API
├── angular.json             # Angular configuration
└── package.json             # Frontend dependencies
```

---

## Features to Add

1. **Deployment**:
   - Deploy the backend using services like Heroku or AWS.
   - Deploy the frontend using Vercel or Netlify.

2. **Security Enhancements**:
   - Use JWT for authentication.
   - Hash passwords using `bcrypt`.

3. **Scalability**:
   - Use Redis for WebSocket message storage.
   - Implement a load balancer for WebSocket connections.

---

## License
This project is licensed under the MIT License. Feel free to use and modify it as needed.

---

## Author
Developed by [Your Name].

