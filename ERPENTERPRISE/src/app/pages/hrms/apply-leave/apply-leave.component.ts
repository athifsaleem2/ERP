import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HrmsService, Employee, LeaveRequest } from '../../../core/services/hrms.service';

@Component({
  selector: 'app-apply-leave',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.css']
})
export class ApplyLeaveComponent implements OnInit {
  today = new Date();
  employees: Employee[] = [];
  saving = false;
  successMsg = '';
  errorMsg = '';

  leaveTypes = ['Sick Leave', 'Casual Leave', 'Annual Leave', 'Maternity Leave', 'Emergency Leave'];

  form: LeaveRequest = {
    employeeId: 0,
    leaveType: 'Casual Leave',
    fromDate: '',
    toDate: '',
    totalDays: 0,
    reason: '',
    status: 'Pending'
  };

  constructor(private hrmsService: HrmsService, private router: Router) {}

  ngOnInit() {
    this.hrmsService.getEmployees().subscribe({
      next: (d) => this.employees = d.filter(e => e.status === 'Active')
    });
  }

  computeDays() {
    if (this.form.fromDate && this.form.toDate) {
      const from = new Date(this.form.fromDate);
      const to   = new Date(this.form.toDate);
      this.form.totalDays = Math.max(1, Math.floor((to.getTime() - from.getTime()) / 86400000) + 1);
    }
  }

  save() {
    if (!this.form.employeeId || !this.form.fromDate || !this.form.toDate) return;
    this.saving = true;
    this.hrmsService.createLeaveRequest(this.form).subscribe({
      next: () => {
        this.successMsg = 'Leave request submitted successfully!';
        this.saving = false;
        setTimeout(() => this.router.navigate(['/dashboard/leave-management']), 1500);
      },
      error: () => { this.errorMsg = 'Failed to submit.'; this.saving = false; }
    });
  }

  cancel() { this.router.navigate(['/dashboard/leave-management']); }
}