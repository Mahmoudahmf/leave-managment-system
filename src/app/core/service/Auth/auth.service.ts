import { Injectable } from '@angular/core';
import { User } from '../../../dataModel/leave.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router, private userService: UserService) {
    const user =  userService.getUser();
    if (user) {
      this.currentUserSubject.next(user);
    }
  }

  login(username: string, password: string): Observable<User> {
    return this.http.get<User[]>('api/users').pipe(
      map(users => {
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
          this.currentUserSubject.next(user);
          return user;
        }
        throw new Error('Invalid username or password');})
    );
  }

  
  logout(): void {
    this.currentUserSubject.next(null);
    this.userService.removeUser();
    this.router.navigate(['/login']);
  }


  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}
