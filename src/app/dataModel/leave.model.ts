export interface LeaveRequest {
  id: number;
  employeeName: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export interface User {
  id: number;
  username: string;
  password: string;
  role: 'admin' | 'employee';
  token: string;
}