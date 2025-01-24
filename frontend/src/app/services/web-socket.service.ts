import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket: WebSocket;

  constructor() {
    // Use the deployed backend WebSocket URL
    this.socket = new WebSocket('wss://drawingcanvas-1.onrender.com');

    // Handle WebSocket connection open
    this.socket.onopen = () => {
      console.log('WebSocket connection established');
    };

    // Handle WebSocket errors
    this.socket.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    // Handle WebSocket close
    this.socket.onclose = () => {
      console.warn('WebSocket connection closed. Consider reconnecting.');
    };
  }

  // Send data to the WebSocket server
  send(data: any): void {
    console.log('Sending data:', data);
    
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data));
    } else {
      console.error('WebSocket is not open. Unable to send data:', data);
    }
  }

  // Listen for incoming messages
  onMessage(callback: (data: any) => void): void {
    this.socket.onmessage = (event) => {
      if (event.data instanceof Blob) {
        // Convert Blob to text
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const parsedData = JSON.parse(reader.result as string);
            console.log('Received from server:', parsedData); // Log received data
            callback(parsedData);
          } catch (error) {
            console.error('Error parsing WebSocket message:', error);
          }
        };
        reader.readAsText(event.data); // Read the Blob as text
      } else {
        // Handle if it's already a string
        try {
          const parsedData = JSON.parse(event.data);
          console.log('Received from server:', parsedData); // Log received data
          callback(parsedData);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      }
    };
  }
}
