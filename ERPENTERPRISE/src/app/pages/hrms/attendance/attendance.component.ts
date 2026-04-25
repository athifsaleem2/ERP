import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HrmsService, Attendance } from '../../../core/services/hrms.service';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  today = new Date();
  attendanceList: Attendance[] = [];
  loading = false;
  filterDate = '';

  constructor(private hrmsService: HrmsService, private router: Router) {}

  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.hrmsService.getAttendance().subscribe({
      next: (d) => { this.attendanceList = d; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  get filtered() {
    if (!this.filterDate) return this.attendanceList;
    return this.attendanceList.filter(a => a.date.startsWith(this.filterDate));
  }

  get presentCount() { return this.filtered.filter(a => a.status === 'Present').length; }
  get absentCount()  { return this.filtered.filter(a => a.status === 'Absent').length; }
  get leaveCount()   { return this.filtered.filter(a => a.status === 'Leave' || a.status === 'Half Day').length; }

  statusColor(s: string) {
    const m: Record<string, string> = { Present: 'success', Absent: 'danger', 'Half Day': 'warning', Leave: 'info' };
    return m[s] || 'secondary';
  }

  markAttendance() { this.router.navigate(['/dashboard/mark-attendance']); }

  delete(id: number | undefined) {
    if (!id || !confirm('Delete this record?')) return;
    this.hrmsService.deleteAttendance(id).subscribe({ next: () => this.load() });
  }
}