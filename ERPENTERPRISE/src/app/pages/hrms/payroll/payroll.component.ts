import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HrmsService, PayrollRecord } from '../../../core/services/hrms.service';

@Component({
  selector: 'app-payroll',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.css']
})
export class PayrollComponent implements OnInit {
  today = new Date();
  payrollList: PayrollRecord[] = [];
  loading = false;
  filterMonth = new Date().getMonth() + 1;
  filterYear = new Date().getFullYear();

  months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  years = [2024, 2025, 2026, 2027];

  constructor(private hrmsService: HrmsService, private router: Router) {}

  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.hrmsService.getPayroll().subscribe({
      next: (d) => { this.payrollList = d; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  get filtered() {
    return this.payrollList.filter(p => p.month === this.filterMonth && p.year === this.filterYear);
  }

  get totalNetSalary() { return this.filtered.reduce((s, p) => s + p.netSalary, 0); }
  get paidCount() { return this.filtered.filter(p => p.status === 'Paid').length; }

  getMonthName(m: number) { return this.months[m - 1]; }

  statusColor(s: string) { return s === 'Paid' ? 'success' : 'warning'; }

  generatePayroll() { this.router.navigate(['/dashboard/generate-payroll']); }

  markPaid(id: number | undefined) {
    if (!id) return;
    this.hrmsService.markPayrollPaid(id).subscribe({ next: () => this.load() });
  }

  delete(id: number | undefined) {
    if (!id || !confirm('Delete this record?')) return;
    this.hrmsService.deletePayroll(id).subscribe({ next: () => this.load() });
  }
}