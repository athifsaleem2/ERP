import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoanService, Loan, LoanEmi } from '../../../core/services/loan.service';

@Component({
  selector: 'app-emi-schedule',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './emi-schedule.component.html',
  styleUrls: ['./emi-schedule.component.css']
})
export class EmiScheduleComponent implements OnInit {

  today: Date = new Date();
  
  loans: Loan[] = [];
  selectedLoanId: number = 0;
  emiList: LoanEmi[] = [];

  constructor(private loanService: LoanService) {}

  ngOnInit(): void {
    this.loanService.getLoans().subscribe({
      next: (data) => this.loans = data.filter(l => l.status === 'Approved'),
      error: (err) => console.error(err)
    });
  }

  onLoanSelect() {
    if (!this.selectedLoanId) {
      this.emiList = [];
      return;
    }
    this.loanService.getLoanEmis(this.selectedLoanId).subscribe({
      next: (emis) => this.emiList = emis,
      error: (err) => console.error(err)
    });
  }

}