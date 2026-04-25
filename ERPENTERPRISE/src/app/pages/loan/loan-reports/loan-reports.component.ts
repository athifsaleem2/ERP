import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoanService, Loan } from '../../../core/services/loan.service';

@Component({
  selector: 'app-loan-reports',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './loan-reports.component.html',
  styleUrls: ['./loan-reports.component.css']
})
export class LoanReportsComponent implements OnInit {

  today: Date = new Date();
  loans: Loan[] = [];

  totalDisbursed: number = 0;
  totalLoans: number = 0;
  totalPending: number = 0;

  constructor(private loanService: LoanService) {}

  ngOnInit(): void {
    this.generateReport();
  }

  generateReport() {
    this.loanService.getLoans().subscribe({
      next: (data) => {
        this.loans = data;
        this.totalLoans = this.loans.filter(l => l.status === 'Approved').length;
        this.totalPending = this.loans.filter(l => l.status === 'Pending').length;
        
        this.totalDisbursed = this.loans
          .filter(l => l.status === 'Approved')
          .reduce((sum, current) => sum + current.principalAmount, 0);
      },
      error: (err) => console.error(err)
    });
  }

}