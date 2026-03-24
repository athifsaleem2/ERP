import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loan-application',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loan-application.component.html',
  styleUrls: ['./loan-application.component.css']
})
export class LoanApplicationComponent {

  today: Date = new Date();
  applicationNumber: string = '';

  loanAmount: number = 0;
  interestRate: number = 0;
  tenure: number = 0;

  totalInterest: number = 0;
  totalPayable: number = 0;

  constructor() {
    this.generateApplicationNumber();
  }

  generateApplicationNumber() {
    const random = Math.floor(100 + Math.random() * 900);
    this.applicationNumber = `LA-${random}`;
  }

  calculateLoan() {
    const interest = (this.loanAmount * this.interestRate * this.tenure) / 100;
    this.totalInterest = interest;
    this.totalPayable = this.loanAmount + interest;
  }

}