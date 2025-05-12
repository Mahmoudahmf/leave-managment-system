import { Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { LoginComponent } from "./components/login/login.component";
import { authGuard } from "./core/guards/auth.guard";
import { LeaveListComponent } from "./components/leave-rquests/leave-list/leave-list.component";
import { LeaveCreateComponent } from "./components/leave-rquests/leave-create/leave-create.component";
import { LeaveDetailsComponent } from "./components/leave-rquests/leave-details/leave-details.component";

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'leave-requests', component: LeaveListComponent, canActivate: [authGuard] },
  { path: 'leave-requests/new', component: LeaveCreateComponent, canActivate: [authGuard] },
  { path: 'leave-requests/:id', component: LeaveDetailsComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' }
];