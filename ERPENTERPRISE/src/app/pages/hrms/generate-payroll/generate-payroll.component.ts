import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HrmsService, Employee, PayrollRecord } from '../../../core/services/hrms.service';

@Component({
  selector: 'app-generate-payroll',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './generate-payroll.component.html',
  styleUrls: ['./generate-payroll.component.css']
})
export class GeneratePayrollComponent implements OnInit {
  today = new Date();
  employees: Employee[] = [];
  loading = false;
  saving = false;
  successMsg = '';
  errorMsg = '';

  months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  years = [2024, 2025, 2026, 2027];

  form: PayrollRecord = {
    employeeId: 0,
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    basicSalary: 0,
    hra: 0,
    da: 0,
    bonus: 0,
    pfDeduction: 0,
    taxDeduction: 0,
    otherDeductions: 0,
    netSalary: 0,
    status: 'Generated'
  };

  constructor(private hrmsService: HrmsService, private router: Router) {}

  ngOnInit() {
    this.hrmsService.getEmployees().subscribe({
      next: (d) => this.employees = d.filter(e => e.status === 'Active')
    });
  }

  onEmployeeChange() {
    const emp = this.employees.find(e => e.id === +this.form.employeeId);
    if (emp) {
      this.form.basicSalary = emp.basicSalary;
      this.autoCompute();
    }
  }

  autoCompute() {
    this.form.hra = +(this.form.basicSalary * 0.4).toFixed(2);
    this.form.da  = +(this.form.basicSalary * 0.1).toFixed(2);
    this.form.pfDeduction = +(this.form.basicSalary * 0.12).toFixed(2);
    this.computeNet();
  }

  computeNet() {
    this.form.netSalary = +(
      this.form.basicSalary + this.form.hra + this.form.da + this.form.bonus
      - this.form.pfDeduction - this.form.taxDeduction - this.form.otherDeductions
    ).toFixed(2);
  }

  save() {
    if (!this.form.employeeId) return;
    this.saving = true;
    this.hrmsService.generatePayroll(this.form).subscribe({
      next: () => {
        this.successMsg = 'Payroll generated successfully!';
        this.saving = false;
        setTimeout(() => this.router.navigate(['/dashboard/payroll']), 1500);
      },
      error: (err) => { this.errorMsg = 'Failed to generate payroll.'; this.saving = false; }
    });
  }

  cancel() { this.router.navigate(['/dashboard/payroll']); }
}