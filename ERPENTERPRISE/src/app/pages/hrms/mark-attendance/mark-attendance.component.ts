import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HrmsService, Employee } from '../../../core/services/hrms.service';

interface BulkRow {
  employeeId: number;
  employeeName: string;
  status: string;
  checkIn: string;
  checkOut: string;
}

@Component({
  selector: 'app-mark-attendance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mark-attendance.component.html',
  styleUrls: ['./mark-attendance.component.css']
})
export class MarkAttendanceComponent implements OnInit {
  today = new Date();
  attendanceDate = new Date().toISOString().split('T')[0];
  rows: BulkRow[] = [];
  loading = false;
  saving = false;
  successMsg = '';
  statusOptions = ['Present', 'Absent', 'Half Day', 'Leave'];

  constructor(private hrmsService: HrmsService, private router: Router) {}

  ngOnInit() { this.loadEmployees(); }

  loadEmployees() {
    this.loading = true;
    this.hrmsService.getEmployees().subscribe({
      next: (emps) => {
        this.rows = emps
          .filter(e => e.status === 'Active')
          .map(e => ({
            employeeId: e.id!,
            employeeName: e.name,
            status: 'Present',
            checkIn: '09:00',
            checkOut: '18:00'
          }));
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  markAll(status: string) { this.rows.forEach(r => r.status = status); }

  save() {
    this.saving = true;
    const records = this.rows.map(r => ({
      employeeId: r.employeeId,
      date: this.attendanceDate,
      status: r.status,
      checkIn: r.checkIn,
      checkOut: r.checkOut
    }));
    this.hrmsService.bulkMarkAttendance(records as any).subscribe({
      next: () => {
        this.successMsg = 'Attendance marked for all employees!';
        this.saving = false;
        setTimeout(() => this.router.navigate(['/dashboard/attendance']), 1800);
      },
      error: () => { this.saving = false; }
    });
  }

  cancel() { this.router.navigate(['/dashboard/attendance']); }
}