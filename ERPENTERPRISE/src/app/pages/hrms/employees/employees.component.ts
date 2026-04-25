import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HrmsService, Employee } from '../../../core/services/hrms.service';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  today = new Date();
  employees: Employee[] = [];
  loading = false;
  searchTerm = '';
  filterStatus = '';

  constructor(private hrmsService: HrmsService, private router: Router) {}

  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.hrmsService.getEmployees().subscribe({
      next: (d) => { this.employees = d; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  get filtered() {
    return this.employees.filter(e => {
      const matchSearch = !this.searchTerm ||
        e.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        e.department.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        e.empCode.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchStatus = !this.filterStatus || e.status === this.filterStatus;
      return matchSearch && matchStatus;
    });
  }

  get activeCount() { return this.employees.filter(e => e.status === 'Active').length; }
  get inactiveCount() { return this.employees.filter(e => e.status === 'Inactive').length; }

  statusColor(status: string) {
    return status === 'Active' ? 'success' : status === 'On Leave' ? 'warning' : 'danger';
  }

  addEmployee() { this.router.navigate(['/dashboard/add-employee']); }

  delete(id: number | undefined) {
    if (!id || !confirm('Delete this employee?')) return;
    this.hrmsService.deleteEmployee(id).subscribe({ next: () => this.load() });
  }
}