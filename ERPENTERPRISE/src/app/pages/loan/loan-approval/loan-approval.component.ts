import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loan-approval',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loan-approval.component.html',
  styleUrls: ['./loan-approval.component.css']
})
export class LoanApprovalComponent {

  today: Date = new Date();

  approveLoan() {
    alert('Loan Approved Successfully');
  }

  rejectLoan() {
    alert('Loan Rejected');
  }

}