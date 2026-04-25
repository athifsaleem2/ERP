import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FinanceService, Account } from '../../../core/services/finance.service';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  today = new Date();
  accounts: Account[] = [];
  loading = false;
  saving = false;
  successMsg = '';
  errorMsg = '';

  form: Account = {
    accountName: '',
    accountType: 'Asset',
    openingBalance: 0,
    notes: ''
  };

  accountTypes = ['Asset', 'Liability', 'Income', 'Expense'];

  constructor(private financeService: FinanceService) {}

  ngOnInit() {
    this.loadAccounts();
  }

  loadAccounts() {
    this.loading = true;
    this.financeService.getAccounts().subscribe({
      next: (data) => { this.accounts = data; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  get totalBalance() {
    return this.accounts.reduce((sum, a) => sum + (a.currentBalance ?? a.openingBalance), 0);
  }

  getTypeColor(type: string): string {
    const map: Record<string, string> = {
      'Asset': 'success',
      'Liability': 'danger',
      'Income': 'primary',
      'Expense': 'warning'
    };
    return map[type] || 'secondary';
  }

  saveAccount() {
    if (!this.form.accountName.trim()) return;
    this.saving = true;
    this.successMsg = '';
    this.errorMsg = '';
    this.financeService.createAccount(this.form).subscribe({
      next: () => {
        this.successMsg = 'Account saved successfully!';
        this.saving = false;
        this.resetForm();
        this.loadAccounts();
        setTimeout(() => this.successMsg = '', 3000);
      },
      error: () => {
        this.errorMsg = 'Failed to save account.';
        this.saving = false;
      }
    });
  }

  deleteAccount(id: number | undefined) {
    if (!id || !confirm('Delete this account?')) return;
    this.financeService.deleteAccount(id).subscribe({
      next: () => this.loadAccounts()
    });
  }

  resetForm() {
    this.form = { accountName: '', accountType: 'Asset', openingBalance: 0, notes: '' };
  }
}