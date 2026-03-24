import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loan-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loan-reports.component.html',
  styleUrls: ['./loan-reports.component.css']
})
export class LoanReportsComponent {

  today: Date = new Date();

  generateReport() {
    alert('Report Generated');
  }

}