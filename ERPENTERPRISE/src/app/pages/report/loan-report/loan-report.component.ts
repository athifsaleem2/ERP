import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoanService } from '../../../core/services/loan.service';

@Component({
  selector: 'app-loan-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './loan-report.component.html',
  styleUrls: ['./loan-report.component.css']
})
export class LoanReportComponent implements OnInit {
  today = new Date();
  loading = false;

  filterStatus = '';
  searchApplicant = '';

  allLoans: any[] = [];

  constructor(private loanService: LoanService) {}

  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.loanService.getLoans().subscribe({
      next: d => { this.allLoans = d; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  get filtered() {
    return this.allLoans.filter(l => {
      const matchStatus = !this.filterStatus || (l.status || '') === this.filterStatus;
      const matchName   = !this.searchApplicant || (l.applicantName || '').toLowerCase().includes(this.searchApplicant.toLowerCase());
      return matchStatus && matchName;
    });
  }

  get totalLoans()     { return this.allLoans.length; }
  get totalPrincipal() { return this.allLoans.reduce((s, l) => s + (l.principalAmount || 0), 0); }
  get activeCount()    { return this.allLoans.filter(l => l.status === 'Active' || l.status === 'Approved').length; }
  get pendingCount()   { return this.allLoans.filter(l => l.status === 'Pending').length; }
  get closedCount()    { return this.allLoans.filter(l => l.status === 'Closed' || l.status === 'Paid').length; }

  statusColor(s: string) {
    const m: Record<string, string> = {
      Active: 'success', Approved: 'info', Pending: 'warning',
      Closed: 'secondary', Paid: 'success', Rejected: 'danger'
    };
    return m[s] || 'secondary';
  }

  clear() { this.filterStatus = ''; this.searchApplicant = ''; }
}