import { Routes } from '@angular/router';
import { CanvasComponent } from './canvas/canvas.component';

export const routes: Routes = [
    {   path: '', redirectTo: 'home', pathMatch: 'full' },  
    { path: 'home', component: CanvasComponent },
        
];
