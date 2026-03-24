import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bank-transactions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bank-transactions.component.html',
  styleUrls: ['./bank-transactions.component.css']
})
export class BankTransactionsComponent {

  today: Date = new Date();

  transactions = [
    { date: '01-03-2026', bank: 'SBI', type: 'Deposit', amount: 10000, status: 'Completed' }
  ];

}