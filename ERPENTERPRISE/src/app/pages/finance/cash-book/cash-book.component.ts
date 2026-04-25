import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FinanceService, Expense, BankTransaction } from '../../../core/services/finance.service';

interface CashBookEntry {
  date: string;
  description: string;
  type: 'expense' | 'bank';
  debit: number;
  credit: number;
  balance: number;
}

@Component({
  selector: 'app-cash-book',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cash-book.component.html',
  styleUrls: ['./cash-book.component.css']
})
export class CashBookComponent implements OnInit {
  today = new Date();
  entries: CashBookEntry[] = [];
  loading = false;

  filterFrom = '';
  filterTo = '';

  constructor(private financeService: FinanceService) {}

  ngOnInit() {
    this.loadCashBook();
  }

  loadCashBook() {
    this.loading = true;
    let expenses: Expense[] = [];
    let txns: BankTransaction[] = [];
    let done = 0;

    const tryBuild = () => {
      done++;
      if (done === 2) {
        this.buildEntries(expenses, txns);
        this.loading = false;
      }
    };

    this.financeService.getExpenses().subscribe({
      next: (data) => { expenses = data; tryBuild(); },
      error: () => tryBuild()
    });

    this.financeService.getBankTransactions().subscribe({
      next: (data) => { txns = data; tryBuild(); },
      error: () => tryBuild()
    });
  }

  buildEntries(expenses: Expense[], txns: BankTransaction[]) {
    const raw: CashBookEntry[] = [];

    expenses.forEach(e => raw.push({
      date: e.expenseDate.split('T')[0],
      description: `[Expense] ${e.category} – ${e.expenseNumber}`,
      type: 'expense',
      debit: e.amount,
      credit: 0,
      balance: 0
    }));

    txns.forEach(t => raw.push({
      date: t.transactionDate.split('T')[0],
      description: `[Bank] ${t.bankName} – ${t.transactionType}`,
      type: 'bank',
      debit: t.transactionType === 'Withdrawal' ? t.amount : 0,
      credit: t.transactionType === 'Deposit' ? t.amount : 0,
      balance: 0
    }));

    raw.sort((a, b) => a.date.localeCompare(b.date));

    let running = 0;
    raw.forEach(e => {
      running += e.credit - e.debit;
      e.balance = running;
    });

    this.entries = raw;
  }

  get filtered() {
    return this.entries.filter(e => {
      if (this.filterFrom && e.date < this.filterFrom) return false;
      if (this.filterTo && e.date > this.filterTo) return false;
      return true;
    });
  }

  get totalDebit() { return this.filtered.reduce((s, e) => s + e.debit, 0); }
  get totalCredit() { return this.filtered.reduce((s, e) => s + e.credit, 0); }
  get closingBalance() { return this.filtered.length ? this.filtered[this.filtered.length - 1].balance : 0; }
}