import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FinanceService, BankTransaction } from '../../../core/services/finance.service';

@Component({
  selector: 'app-bank-transactions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bank-transactions.component.html',
  styleUrls: ['./bank-transactions.component.css']
})
export class BankTransactionsComponent implements OnInit {
  today = new Date();
  transactions: BankTransaction[] = [];
  loading = false;
  saving = false;
  successMsg = '';
  errorMsg = '';

  summary = { deposits: 0, withdrawals: 0, netBalance: 0 };
  transactionTypes = ['Deposit', 'Withdrawal', 'Transfer'];

  form: BankTransaction = {
    transactionDate: new Date().toISOString().split('T')[0],
    bankName: '',
    accountNo: '',
    transactionType: 'Deposit',
    amount: 0,
    referenceNo: '',
    narration: ''
  };

  constructor(private financeService: FinanceService) {}

  ngOnInit() {
    this.loadTransactions();
    this.loadSummary();
  }

  loadTransactions() {
    this.loading = true;
    this.financeService.getBankTransactions().subscribe({
      next: (data) => { this.transactions = data; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  loadSummary() {
    this.financeService.getBankSummary().subscribe({
      next: (s) => this.summary = s
    });
  }

  getTypeBadge(type: string): string {
    return type === 'Deposit' ? 'success' : type === 'Withdrawal' ? 'danger' : 'warning';
  }

  saveTransaction() {
    if (!this.form.bankName || this.form.amount <= 0) return;
    this.saving = true;
    this.financeService.createBankTransaction(this.form).subscribe({
      next: () => {
        this.successMsg = 'Transaction saved!';
        this.saving = false;
        this.resetForm();
        this.loadTransactions();
        this.loadSummary();
        setTimeout(() => this.successMsg = '', 3000);
      },
      error: () => { this.errorMsg = 'Failed to save.'; this.saving = false; }
    });
  }

  deleteTransaction(id: number | undefined) {
    if (!id || !confirm('Delete this transaction?')) return;
    this.financeService.deleteBankTransaction(id).subscribe({
      next: () => { this.loadTransactions(); this.loadSummary(); }
    });
  }

  resetForm() {
    this.form = {
      transactionDate: new Date().toISOString().split('T')[0],
      bankName: '', accountNo: '', transactionType: 'Deposit',
      amount: 0, referenceNo: '', narration: ''
    };
  }
}