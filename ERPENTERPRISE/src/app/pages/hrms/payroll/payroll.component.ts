import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payroll',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.css']
})
export class PayrollComponent {
  constructor(private router: Router) {}

  payrollList = [
    {
      employee: 'John Doe',
      basic: 30000,
      deduction: 2000,
      net: 28000
    },
    {
      employee: 'Jane Smith',
      basic: 35000,
      deduction: 2500,
      net: 32500
    }
  ];
GeneratePayroll(){
    this.router.navigate(['/dashboard/generate-payroll']);

}
}