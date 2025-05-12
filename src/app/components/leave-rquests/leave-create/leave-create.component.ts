import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LeaveService } from '../../../services/leave.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/service/Auth/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-leave-create',
  standalone: true,
  imports: [ ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule],
  templateUrl: './leave-create.component.html',
  styleUrl: './leave-create.component.scss'
})
export class LeaveCreateComponent {
leaveForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private leaveService: LeaveService,
    private authService: AuthService,
    private router: Router
  ) {
    this.leaveForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      reason: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit(): void {
    if (this.leaveForm.valid) {
      const user = this.authService.getCurrentUser();
      if (!user) {
        return;
      }
      const request:any = {
        employeeName: user.username,
        startDate: this.leaveForm.value.startDate,
        endDate: this.leaveForm.value.endDate,
        reason: this.leaveForm.value.reason,
        status: 'Pending'
      };
      this.leaveService.createLeaveRequest(request).subscribe({
        next: () => {
          this.router.navigate(['/leave-requests']);
        },
        error: (err) => {
          console.error('Error creating leave request:', err);
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/leave-requests']);
  }
}
