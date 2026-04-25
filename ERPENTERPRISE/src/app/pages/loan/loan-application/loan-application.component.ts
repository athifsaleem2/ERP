import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoanService, Loan } from '../../../core/services/loan.service';

@Component({
  selector: 'app-loan-application',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './loan-application.component.html',
  styleUrls: ['./loan-application.component.css']
})
export class LoanApplicationComponent {

  today: Date = new Date();

  loan: Loan = {
    applicantName: '',
    principalAmount: 0,
    interestRate: 0,
    tenureMonths: 0
  };

  constructor(private loanService: LoanService) {}

  get totalInterest(): number {
    return (this.loan.principalAmount * this.loan.interestRate * this.loan.tenureMonths / 12) / 100;
  }

  get totalPayable(): number {
    return this.loan.principalAmount + this.totalInterest;
  }

  save() {
    if(!this.loan.applicantName || this.loan.principalAmount <= 0 || this.loan.tenureMonths <= 0) {
       alert("Please fill necessary details");
       return;
    }
    this.loanService.applyForLoan(this.loan).subscribe({
      next: (res) => {
        alert("Loan applied successfully! Status: " + res.status);
        this.loan = { applicantName: '', principalAmount: 0, interestRate: 0, tenureMonths: 0 };
      },
      error: (err) => alert("Error applying for loan")
    });
  }

}