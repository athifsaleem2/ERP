import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoanService, Loan, LoanEmi } from '../../../core/services/loan.service';

@Component({
  selector: 'app-penalty-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './penalty-management.component.html',
  styleUrls: ['./penalty-management.component.css']
})
export class PenaltyManagementComponent implements OnInit {

  today: Date = new Date();

  loans: Loan[] = [];
  selectedLoanId: number = 0;
  pendingEmis: LoanEmi[] = [];
  selectedEmiId: number = 0;
  penaltyAmount: number = 0;

  constructor(private loanService: LoanService) {}

  ngOnInit(): void {
    this.loanService.getLoans().subscribe({
      next: (data) => this.loans = data.filter(l => l.status === 'Approved'),
      error: (err) => console.error(err)
    });
  }

  onLoanSelect() {
    this.selectedEmiId = 0;
    this.penaltyAmount = 0;
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

  applyPenalty() {
    if (!this.selectedEmiId || this.penaltyAmount <= 0) {
      alert("Please select an EMI and enter a valid penalty amount.");
      return;
    }
    this.loanService.addPenalty(this.selectedEmiId, this.penaltyAmount).subscribe({
      next: () => {
        alert("Penalty Applied Successfully");
        this.penaltyAmount = 0;
        this.selectedEmiId = 0;
        this.loadPendingEmis();
      },
      error: (err) => console.error(err)
    });
  }

}