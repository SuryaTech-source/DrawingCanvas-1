import { Routes } from '@angular/router';
import { CanvasComponent } from './canvas/canvas.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {   path: '', redirectTo: 'home', pathMatch: 'full' },  
    { path: 'home', component: CanvasComponent },
    {path:'login',component:LoginComponent},

        
];
