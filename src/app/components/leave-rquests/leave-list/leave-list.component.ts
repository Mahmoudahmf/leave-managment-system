import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { LeaveRequest } from '../../../dataModel/leave.model';
import { LeaveService } from '../../../services/leave.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../core/service/Auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-leave-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './leave-list.component.html',
  styleUrls: ['./leave-list.component.scss']
})
export class LeaveListComponent implements AfterViewInit {
  displayedColumns: string[] = ['employeeName', 'startDate', 'endDate', 'reason', 'status', 'actions'];
  dataSource = new MatTableDataSource<LeaveRequest>([]);
  statusFilter: string = '';
  pageSize:number = 5;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private leaveService: LeaveService,
    private authService: AuthService
  ) {}

  ngAfterViewInit(): void {
    this.loadLeaveRequests();
    this.setupFilter();
  }

  loadLeaveRequests(): void {
    this.leaveService.getLeaveRequests().subscribe(requests => {
      const user = this.authService.getCurrentUser();
      const filteredRequests = user?.role === 'admin' 
        ? requests 
        : requests.filter(r => r.employeeName === user?.username);
      
      this.dataSource.data = filteredRequests;
      this.dataSource.paginator = this.paginator;
    });
  }

  setupFilter(): void {
    this.dataSource.filterPredicate = (data: LeaveRequest, filter: string): boolean => {
      // Show all if no filter
      if (!filter) return true;
      
      // Filter by status (case insensitive)
      return data.status.toLowerCase() === filter.toLowerCase();
    };
  }

  applyFilter(): void {
    // Apply the filter
    this.dataSource.filter = this.statusFilter;
    
    // Go back to first page when filtering
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}