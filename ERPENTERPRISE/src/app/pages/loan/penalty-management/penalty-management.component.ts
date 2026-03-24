import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-penalty-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './penalty-management.component.html',
  styleUrls: ['./penalty-management.component.css']
})
export class PenaltyManagementComponent {

  today: Date = new Date();

  penaltyPercent: number = 0;
  overdueAmount: number = 0;
  penaltyAmount: number = 0;

  calculatePenalty() {
    this.penaltyAmount = (this.overdueAmount * this.penaltyPercent) / 100;
  }

}