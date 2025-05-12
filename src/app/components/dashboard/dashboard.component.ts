import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { LeaveService } from '../../services/leave.service';
import { AuthService } from '../../core/service/Auth/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { HasPermissionDirective } from '../../shared/directives/has-permission/has-permission.directive';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ MatCardModule, MatButtonModule, RouterModule,HasPermissionDirective],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
stats: {label: string, value: number}[] = [];

  constructor(
    private leaveService: LeaveService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.leaveService.getLeaveRequests().subscribe(requests => {
      const user = this.authService.getCurrentUser();
      const userRequests = user?.role === 'admin' 
        ? requests 
        : requests.filter(r => r.employeeName === user?.username);

      this.stats = [
        { label: 'Total Requests', value: userRequests.length },
        { label: 'Pending', value: userRequests.filter(r => r.status === 'Pending').length },
        { label: 'Approved', value: userRequests.filter(r => r.status === 'Approved').length },
        { label: 'Rejected', value: userRequests.filter(r => r.status === 'Rejected').length }
      ];
    });
  }
}
