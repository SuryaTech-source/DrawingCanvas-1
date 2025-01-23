import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket: WebSocket;

  constructor() {
    this.socket = new WebSocket('ws://localhost:3000');

    // Handle WebSocket errors
    this.socket.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };
  }

  // Send data to the WebSocket server
  send(data: any): void {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data));
    } else {
      console.error('WebSocket is not open. Unable to send data:', data);
    }
  }

  // Listen for incoming messages
  onMessage(callback: (data: any) => void): void {
    this.socket.onmessage = (event) => {
      try {
        const parsedData = JSON.parse(event.data);
        callback(parsedData);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };
  }
}
