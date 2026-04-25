import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FinanceService, Expense } from '../../../core/services/finance.service';

@Component({
  selector: 'app-expense-entry',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './expense-entry.component.html',
  styleUrls: ['./expense-entry.component.css']
})
export class ExpenseEntryComponent implements OnInit {
  today = new Date();
  expenses: Expense[] = [];
  loading = false;
  saving = false;
  successMsg = '';
  errorMsg = '';

  categories = ['Rent', 'Utilities', 'Salaries', 'Office Supplies', 'Marketing',
                 'Travel', 'Maintenance', 'Insurance', 'Bank Charges', 'Miscellaneous'];
  paymentModes = ['Cash', 'Bank Transfer', 'Card', 'Cheque', 'UPI'];

  form: Expense = {
    expenseNumber: '',
    expenseDate: new Date().toISOString().split('T')[0],
    category: '',
    description: '',
    amount: 0,
    paymentMode: 'Cash'
  };

  constructor(private financeService: FinanceService) {}

  ngOnInit() {
    this.generateExpenseNumber();
    this.loadExpenses();
  }

  generateExpenseNumber() {
    const ts = Date.now().toString().slice(-6);
    this.form.expenseNumber = `EXP-${ts}`;
  }

  loadExpenses() {
    this.loading = true;
    this.financeService.getExpenses().subscribe({
      next: (data) => { this.expenses = data; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  get totalAmount() {
    return this.expenses.reduce((sum, e) => sum + e.amount, 0);
  }

  saveExpense() {
    if (!this.form.category || this.form.amount <= 0) return;
    this.saving = true;
    this.successMsg = '';
    this.errorMsg = '';
    this.financeService.createExpense(this.form).subscribe({
      next: () => {
        this.successMsg = 'Expense recorded successfully!';
        this.saving = false;
        this.resetForm();
        this.loadExpenses();
        setTimeout(() => this.successMsg = '', 3000);
      },
      error: () => {
        this.errorMsg = 'Failed to save expense.';
        this.saving = false;
      }
    });
  }

  deleteExpense(id: number | undefined) {
    if (!id || !confirm('Delete this expense?')) return;
    this.financeService.deleteExpense(id).subscribe({
      next: () => this.loadExpenses()
    });
  }

  resetForm() {
    this.generateExpenseNumber();
    this.form.expenseDate = new Date().toISOString().split('T')[0];
    this.form.category = '';
    this.form.description = '';
    this.form.amount = 0;
    this.form.paymentMode = 'Cash';
  }
}