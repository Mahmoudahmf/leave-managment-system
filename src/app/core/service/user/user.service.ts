import { Injectable } from '@angular/core';
import { User } from '../../../dataModel/leave.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly USER_KEY = 'auth_user';

  constructor() { }

  getUser(): User | null {
    let user = localStorage.getItem(this.USER_KEY);
    if (user) {
       return JSON.parse(user);
    }
    return null;
  }

  setUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  removeUser(): void {
    localStorage.removeItem(this.USER_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getUser();
  }
}
