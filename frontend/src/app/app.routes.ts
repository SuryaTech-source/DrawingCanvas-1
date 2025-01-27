import { Routes } from '@angular/router';
import { CanvasComponent } from './canvas/canvas.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Add `pathMatch: 'full'`
  { path: 'home', component: CanvasComponent },
];