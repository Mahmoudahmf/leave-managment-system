import { Component } from '@angular/core';
import { LeaveService } from '../../../services/leave.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LeaveRequest } from '../../../dataModel/leave.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HasPermissionDirective } from '../../../shared/directives/has-permission/has-permission.directive';

@Component({
  selector: 'app-leave-details',
  standalone: true,
  imports: [ CommonModule,MatCardModule, MatButtonModule, MatIconModule,HasPermissionDirective],
  templateUrl: './leave-details.component.html',
  styleUrl: './leave-details.component.scss'
})
export class LeaveDetailsComponent {
   request: LeaveRequest | null = null;

  constructor(
    private leaveService: LeaveService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('id:', id);
    
    if (id) {
      this.loadLeaveRequest(+id);
    }
  }

  loadLeaveRequest(id: number): void {
    this.leaveService.getLeaveRequestById(id).subscribe(request => {
      this.request = request;      
    });
  }

  updateStatus(status: 'Approved' | 'Rejected'): void {
    
    if (this.request) {
      this.leaveService.updateLeaveRequestStatus({...this.request, status: status})
        .subscribe({
          next: () => {            
            if (this.request) {
              this.request.status = status;
            }
          },
          error: (err) => {
            console.error('Error updating status:', err);
          }
        });
    }
  }

  goBack(): void {
    this.router.navigate(['/leave-requests']);
  }

}
