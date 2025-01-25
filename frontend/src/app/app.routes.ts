import { Routes } from '@angular/router';
import { CanvasComponent } from './canvas/canvas.component';

export const routes: Routes = [
    {   path: '', redirectTo: 'home' },  
    { path: 'home', component: CanvasComponent },
        
];
