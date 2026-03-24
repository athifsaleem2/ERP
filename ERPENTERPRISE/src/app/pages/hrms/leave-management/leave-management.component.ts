import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leave-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leave-management.component.html',
  styleUrls: ['./leave-management.component.css']
})
export class LeaveManagementComponent {
  constructor(private router: Router) {}

  leaveList = [
    {
      employee: 'John Doe',
      type: 'Sick Leave',
      from: '10 Mar 2026',
      to: '12 Mar 2026',
      status: 'Pending'
    },
    {
      employee: 'Jane Smith',
      type: 'Casual Leave',
      from: '05 Mar 2026',
      to: '06 Mar 2026',
      status: 'Approved'
    }
  ];

ApplyLeave() {
  this.router.navigate(['/dashboard/apply-leave']);
}
}
//hai
//hai