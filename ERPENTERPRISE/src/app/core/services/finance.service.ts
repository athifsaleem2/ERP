import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// ─── Interfaces ───────────────────────────────────────────────────────────────

export interface Account {
  id?: number;
  accountName: string;
  accountType: string;
  openingBalance: number;
  currentBalance?: number;
  notes?: string;
  createdAt?: string;
}

export interface Expense {
  id?: number;
  expenseNumber: string;
  expenseDate: string;
  category: string;
  description?: string;
  amount: number;
  paymentMode: string;
  accountId?: number;
  createdAt?: string;
}

export interface BankTransaction {
  id?: number;
  transactionDate: string;
  bankName: string;
  accountNo?: string;
  transactionType: string;
  amount: number;
  referenceNo?: string;
  narration?: string;
  createdAt?: string;
}

// ─── Service ──────────────────────────────────────────────────────────────────

@Injectable({ providedIn: 'root' })
export class FinanceService {
  private base = 'http://localhost:52888/api';

  constructor(private http: HttpClient) {}

  // ── Accounts ──────────────────────────────────────────────────────────────
  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.base}/Accounts`);
  }
  createAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(`${this.base}/Accounts`, account);
  }
  updateAccount(id: number, account: Account): Observable<void> {
    return this.http.put<void>(`${this.base}/Accounts/${id}`, account);
  }
  deleteAccount(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/Accounts/${id}`);
  }

  // ── Expenses ──────────────────────────────────────────────────────────────
  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.base}/Expenses`);
  }
  getExpenseTotal(): Observable<{ total: number }> {
    return this.http.get<{ total: number }>(`${this.base}/Expenses/total`);
  }
  createExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(`${this.base}/Expenses`, expense);
  }
  deleteExpense(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/Expenses/${id}`);
  }

  // ── Bank Transactions ──────────────────────────────────────────────────────
  getBankTransactions(): Observable<BankTransaction[]> {
    return this.http.get<BankTransaction[]>(`${this.base}/BankTransactions`);
  }
  getBankSummary(): Observable<{ deposits: number; withdrawals: number; netBalance: number }> {
    return this.http.get<any>(`${this.base}/BankTransactions/summary`);
  }
  createBankTransaction(txn: BankTransaction): Observable<BankTransaction> {
    return this.http.post<BankTransaction>(`${this.base}/BankTransactions`, txn);
  }
  deleteBankTransaction(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/BankTransactions/${id}`);
  }
}
