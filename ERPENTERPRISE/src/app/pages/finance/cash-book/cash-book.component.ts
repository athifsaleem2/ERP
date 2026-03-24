import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cash-book',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cash-book.component.html',
  styleUrls: ['./cash-book.component.css']
})
export class CashBookComponent {

  today: Date = new Date();

  transactions = [
    { date: '01-03-2026', desc: 'Sales', debit: 0, credit: 5000, balance: 5000 },
    { date: '02-03-2026', desc: 'Office Rent', debit: 2000, credit: 0, balance: 3000 }
  ];

}