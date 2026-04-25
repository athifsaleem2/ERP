import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanService, Loan } from '../../../core/services/loan.service';

@Component({
  selector: 'app-loan-approval',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loan-approval.component.html',
  styleUrls: ['./loan-approval.component.css']
})
export class LoanApprovalComponent implements OnInit {

  today: Date = new Date();
  pendingLoans: Loan[] = [];

  constructor(private loanService: LoanService) {}

  ngOnInit(): void {
    this.loadPendingLoans();
  }

  loadPendingLoans() {
    this.loanService.getLoans().subscribe({
      next: (loans) => this.pendingLoans = loans.filter(l => l.status === 'Pending'),
      error: (err) => console.error(err)
    });
  }

  approveLoan(id: number | undefined) {
    if (!id) return;
    this.loanService.approveLoan(id).subscribe(() => {
      alert('Loan Approved Successfully');
      this.loadPendingLoans();
    });
  }

  rejectLoan(id: number | undefined) {
    if (!id) return;
    this.loanService.rejectLoan(id).subscribe(() => {
      alert('Loan Rejected');
      this.loadPendingLoans();
    });
  }

}