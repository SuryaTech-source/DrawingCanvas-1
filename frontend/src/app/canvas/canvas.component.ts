import { Component, ElementRef, ViewChild, HostListener } from '@angular/core';
import { WebSocketService } from '../services/web-socket.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule],
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private drawing = false; // Track if the user is actively drawing

  brushSize = 5; // Default brush size
  brushColor = '#000000'; // Default brush color

  constructor(private webSocketService: WebSocketService) {}

  ngAfterViewInit(): void {
    const canvas = this.canvas.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Listen for drawing data and reset events from the WebSocket
    this.webSocketService.onMessage((data) => {
      if (data.type === 'reset') {
        console.log('Reset event received');
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
      } else {
        this.renderDrawing(data);
      }
    });
  }

  private renderDrawing(data: any): void {
    const { x, y, brushSize, brushColor } = data;
    this.ctx.fillStyle = brushColor;
    this.ctx.beginPath();
    this.ctx.arc(x, y, brushSize, 0, Math.PI * 2);
    this.ctx.fill();
  }

  // Start drawing on mousedown or touchstart
  @HostListener('mousedown', ['$event'])
  @HostListener('touchstart', ['$event'])
  startDrawing(event: MouseEvent | TouchEvent): void {
    this.drawing = true; // Set drawing to true
    this.draw(event, true); // Draw the first point
  }

  // Draw continuously while moving the mouse or touch
  @HostListener('mousemove', ['$event'])
  @HostListener('touchmove', ['$event'])
  draw(event: MouseEvent | TouchEvent, emit: boolean = true): void {
    if (!this.drawing) return; // Stop if not drawing

    const rect = this.canvas.nativeElement.getBoundingClientRect();
    const x = (event instanceof MouseEvent ? event.clientX : event.touches[0].clientX) - rect.left;
    const y = (event instanceof MouseEvent ? event.clientY : event.touches[0].clientY) - rect.top;

    // Draw the point on the canvas
    this.ctx.fillStyle = this.brushColor;
    this.ctx.beginPath();
    this.ctx.arc(x, y, this.brushSize, 0, Math.PI * 2);
    this.ctx.fill();

    // Emit drawing data to the server for every movement
    if (emit) {
      this.webSocketService.send({ x, y, brushSize: this.brushSize, brushColor: this.brushColor });
    }
  }

  // Stop drawing on mouseup or touchend
  @HostListener('mouseup')
  @HostListener('touchend')
  stopDrawing(): void {
    this.drawing = false; // Set drawing to false
  }

  // Stop drawing if the user leaves the canvas area
  @HostListener('mouseleave')
  stopDrawingOnLeave(): void {
    this.drawing = false;
  }

  resetCanvas(): void {
    // Clear the local canvas
    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

    // Notify the server to broadcast a reset event
    this.webSocketService.send({ type: 'reset' });
  }
}
