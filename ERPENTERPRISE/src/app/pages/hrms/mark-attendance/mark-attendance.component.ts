import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mark-attendance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mark-attendance.component.html',
  styleUrls: ['./mark-attendance.component.css']
})
export class MarkAttendanceComponent {

  employees = [
    { name: 'John Doe', status: 'Present' },
    { name: 'Jane Smith', status: 'Absent' }
  ];

  markAttendance() {
    alert("Attendance Marked Successfully");
  }

}