import { Routes } from '@angular/router';
import { ProjectComponent } from './components/project/project.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from'./guards/auth.guard';
export const routes: Routes = [

    {
        path:'login',
        component:LoginComponent,
        // canActivate: [authGuard],
        
    },
    {
        path: 'dashboard',
        component:DashboardComponent,
        canActivate: [authGuard],
    },
    {
        path:'projects/:id',
        component: ProjectComponent,
        // canActivate: [authGuard],
    },
    {
        path:'register',
        component:RegisterComponent,
        // canActivate: [authGuard],
    },
    {
        path: '',
        redirectTo: '/dashboard',
        
        pathMatch: 'full'
    }
]
