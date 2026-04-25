import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Loan {
  id?: number;
  applicantName: string;
  principalAmount: number;
  interestRate: number;
  tenureMonths: number;
  status?: string;
  createdAt?: string;
  approvedAt?: string;
}

export interface LoanEmi {
  id?: number;
  loanId: number;
  dueDate: string;
  principalComponent: number;
  interestComponent: number;
  totalEmi: number;
  penaltyAmount: number;
  status: string;
  paidDate?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private apiUrl = 'http://localhost:52888/api/Loans';

  constructor(private http: HttpClient) { }

  getLoans(): Observable<Loan[]> {
    return this.http.get<Loan[]>(this.apiUrl);
  }

  getLoan(id: number): Observable<Loan> {
    return this.http.get<Loan>(`${this.apiUrl}/${id}`);
  }

  applyForLoan(loan: Loan): Observable<Loan> {
    return this.http.post<Loan>(this.apiUrl, loan);
  }

  approveLoan(id: number): Observable<Loan> {
    return this.http.put<Loan>(`${this.apiUrl}/${id}/approve`, {});
  }

  rejectLoan(id: number): Observable<Loan> {
    return this.http.put<Loan>(`${this.apiUrl}/${id}/reject`, {});
  }

  getLoanEmis(id: number): Observable<LoanEmi[]> {
    return this.http.get<LoanEmi[]>(`${this.apiUrl}/${id}/emis`);
  }

  payEmi(emiId: number): Observable<LoanEmi> {
    return this.http.put<LoanEmi>(`${this.apiUrl}/emis/${emiId}/pay`, {});
  }

  addPenalty(emiId: number, amount: number): Observable<LoanEmi> {
    return this.http.put<LoanEmi>(`${this.apiUrl}/emis/${emiId}/penalty`, amount);
  }
}
