import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LeaveRequest } from '../dataModel/leave.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  constructor(private http: HttpClient) {}

  getLeaveRequests(): Observable<LeaveRequest[]> {
    return this.http.get<LeaveRequest[]>('api/leaveRequests');
  }

  getLeaveRequestById(id: number): Observable<LeaveRequest> {
    return this.http.get<LeaveRequest>(`api/leaveRequests/${id}`);
  }

  createLeaveRequest(request: Omit<LeaveRequest, 'id'>): Observable<LeaveRequest> {
    return this.http.post<LeaveRequest>('api/leaveRequests', request);
  }

  updateLeaveRequestStatus(request:LeaveRequest): Observable<LeaveRequest> {
    return this.http.post<LeaveRequest>(`api/leaveRequests/${request.id}`, { ...request });
  }
}
