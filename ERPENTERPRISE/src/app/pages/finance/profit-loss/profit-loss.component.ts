import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profit-loss',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profit-loss.component.html',
  styleUrls: ['./profit-loss.component.css']
})
export class ProfitLossComponent {

  today: Date = new Date();

  totalIncome = 150000;
  totalExpense = 90000;

  get netProfit() {
    return this.totalIncome - this.totalExpense;
  }

}