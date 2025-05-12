import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { LeaveRequest, User } from '../../../dataModel/leave.model';

@Injectable({
  providedIn: 'root'
})
export class MockDataService implements InMemoryDbService {
  createDb() {
    const leaveRequests: LeaveRequest[] = [
      { id: 1, employeeName: 'mahmoud@123', startDate: '2023-01-10', endDate: '2023-01-15', reason: 'Vacation', status: 'Approved' },
      { id: 2, employeeName: 'ali@123', startDate: '2023-02-01', endDate: '2023-02-05', reason: 'Family event', status: 'Pending' },
      { id: 3, employeeName: 'mahmoud@123', startDate: '2023-03-20', endDate: '2023-03-25', reason: 'Sick leave', status: 'Rejected' }
    ];

    const users: User[] = [
      { id: 1, username: 'admin@123', password: 'admin123', role: 'admin', token: 'fake-admin-token' },
      { id: 2, username: 'mahmoud@123', password: 'mahmoud123', role: 'employee', token: 'fake-john-token' },
    ];

    return { leaveRequests, users };
  }
}
