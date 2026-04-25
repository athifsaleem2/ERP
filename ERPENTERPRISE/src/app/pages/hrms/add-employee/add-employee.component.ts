import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HrmsService, Employee } from '../../../core/services/hrms.service';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  today = new Date();
  saving = false;
  successMsg = '';
  errorMsg = '';

  departments = ['HR', 'Sales', 'Purchase', 'Accounts & Finance', 'IT', 'Operations', 'Marketing', 'Logistics'];
  statusOptions = ['Active', 'Inactive'];

  form: Employee = {
    empCode: '',
    name: '',
    email: '',
    phone: '',
    department: '',
    designation: '',
    basicSalary: 0,
    joiningDate: new Date().toISOString().split('T')[0],
    status: 'Active',
    address: ''
  };

  constructor(private hrmsService: HrmsService, private router: Router) {}

  ngOnInit() {
    this.hrmsService.generateEmpCode().subscribe({
      next: (res) => this.form.empCode = res.empCode,
      error: () => this.form.empCode = `EMP-${Date.now().toString().slice(-4)}`
    });
  }

  save() {
    if (!this.form.name || !this.form.department) return;
    this.saving = true;
    this.hrmsService.createEmployee(this.form).subscribe({
      next: () => {
        this.successMsg = 'Employee saved successfully!';
        this.saving = false;
        setTimeout(() => this.router.navigate(['/dashboard/employees']), 1500);
      },
      error: (err) => {
        this.errorMsg = err?.error?.message || 'Failed to save employee.';
        this.saving = false;
      }
    });
  }

  cancel() { this.router.navigate(['/dashboard/employees']); }
}