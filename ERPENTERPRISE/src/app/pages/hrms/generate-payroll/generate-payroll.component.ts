import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-generate-payroll',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './generate-payroll.component.html',
  styleUrls: ['./generate-payroll.component.css']
})
export class GeneratePayrollComponent {

  payroll = {
    employee: '',
    basic: 0,
    bonus: 0,
    deduction: 0
  };

  generate() {
    alert("Payroll Generated");
  }

}