import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent {
  constructor(private router: Router) {}

  today: Date = new Date();

  attendanceList = [
    {
      employee: 'John Doe',
      date: new Date(),
      status: 'Present',
      checkin: '09:00 AM',
      checkout: '06:00 PM'
    },
    {
      employee: 'Jane Smith',
      date: new Date(),
      status: 'Absent',
      checkin: '-',
      checkout: '-'
    }
  ];
  
addAttendance() {
  this.router.navigate(['/dashboard/mark-attendance']);
}
}