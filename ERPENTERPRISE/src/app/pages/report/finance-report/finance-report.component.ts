import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FinanceService } from '../../../core/services/finance.service';
import { SalesInvoiceService } from '../../../core/services/sales-invoice.service';

@Component({
  selector: 'app-finance-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './finance-report.component.html',
  styleUrls: ['./finance-report.component.css']
})
export class FinanceReportComponent implements OnInit {
  today = new Date();
  loading = false;

  fromDate = '';
  toDate = '';
  activeTab: 'summary' | 'expenses' | 'transactions' = 'summary';

  expenses: any[] = [];
  bankTransactions: any[] = [];
  accounts: any[] = [];
  salesInvoices: any[] = [];

  constructor(
    private financeService: FinanceService,
    private salesService: SalesInvoiceService
  ) {}

  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    let done = 0;
    const finish = () => { if (++done >= 4) this.loading = false; };

    this.financeService.getExpenses().subscribe({ next: d => { this.expenses = d; finish(); }, error: finish });
    this.financeService.getBankTransactions().subscribe({ next: d => { this.bankTransactions = d; finish(); }, error: finish });
    this.financeService.getAccounts().subscribe({ next: d => { this.accounts = d; finish(); }, error: finish });
    this.salesService.getInvoices().subscribe({ next: d => { this.salesInvoices = d; finish(); }, error: finish });
  }

  // Filtered by date range
  get filteredExpenses() {
    return this.expenses.filter(e => {
      const d = new Date(e.expenseDate || e.date || e.createdAt);
      return (!this.fromDate || d >= new Date(this.fromDate)) && (!this.toDate || d <= new Date(this.toDate));
    });
  }

  get filteredTransactions() {
    return this.bankTransactions.filter(t => {
      const d = new Date(t.transactionDate || t.date || t.createdAt);
      return (!this.fromDate || d >= new Date(this.fromDate)) && (!this.toDate || d <= new Date(this.toDate));
    });
  }

  // KPI Summary
  get totalIncome()      { return this.salesInvoices.reduce((s, i) => s + (i.grandTotal || 0), 0); }
  get totalExpenses()    { return this.filteredExpenses.reduce((s, e) => s + (e.amount || 0), 0); }
  get netProfit()        { return this.totalIncome - this.totalExpenses; }
  get isProfit()         { return this.netProfit >= 0; }
  get profitMargin()     { return this.totalIncome > 0 ? ((this.netProfit / this.totalIncome) * 100).toFixed(1) : '0.0'; }

  get totalDeposits()    { return this.filteredTransactions.filter(t => t.transactionType === 'Deposit').reduce((s, t) => s + (t.amount || 0), 0); }
  get totalWithdrawals() { return this.filteredTransactions.filter(t => t.transactionType === 'Withdrawal').reduce((s, t) => s + (t.amount || 0), 0); }
  get bankBalance()      { return this.totalDeposits - this.totalWithdrawals; }

  // Expense by category
  get expenseByCategory() {
    const map: Record<string, number> = {};
    this.filteredExpenses.forEach(e => {
      const c = e.category || 'Other';
      map[c] = (map[c] || 0) + (e.amount || 0);
    });
    return Object.entries(map).map(([label, amount]) => ({ label, amount }))
      .sort((a, b) => b.amount - a.amount);
  }

  clear() { this.fromDate = ''; this.toDate = ''; }
}