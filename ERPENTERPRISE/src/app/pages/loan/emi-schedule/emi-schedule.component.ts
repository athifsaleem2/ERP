import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-emi-schedule',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './emi-schedule.component.html',
  styleUrls: ['./emi-schedule.component.css']
})
export class EmiScheduleComponent {

  today: Date = new Date();

  emiList = [
    { no: 1, date: '01-05-2026', principal: 5000, interest: 500, total: 5500, status: 'Pending' },
    { no: 2, date: '01-06-2026', principal: 5000, interest: 450, total: 5450, status: 'Pending' }
  ];

}