import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoanService, Loan, LoanEmi } from '../../../core/services/loan.service';

@Component({
  selector: 'app-emi-payments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './emi-payments.component.html',
  styleUrls: ['./emi-payments.component.css']
})
export class EmiPaymentsComponent implements OnInit {

  today: Date = new Date();
  
  loans: Loan[] = [];
  selectedLoanId: number = 0;
  pendingEmis: LoanEmi[] = [];

  constructor(private loanService: LoanService) {}

  ngOnInit(): void {
    this.loanService.getLoans().subscribe({
      next: (data) => this.loans = data.filter(l => l.status === 'Approved'),
      error: (err) => console.error(err)
    });
  }

  onLoanSelect() {
    if (!this.selectedLoanId) {
      this.pendingEmis = [];
      return;
    }
    this.loadPendingEmis();
  }

  loadPendingEmis() {
    this.loanService.getLoanEmis(this.selectedLoanId).subscribe({
      next: (emis) => this.pendingEmis = emis.filter(e => e.status !== 'Paid'),
      error: (err) => console.error(err)
    });
  }

  payEmi(emiId: number | undefined) {
    if (!emiId) return;
    this.loanService.payEmi(emiId).subscribe({
      next: () => {
        alert('EMI Payment Successful');
        this.loadPendingEmis();
      },
      error: (err) => console.error(err)
    });
  }

}