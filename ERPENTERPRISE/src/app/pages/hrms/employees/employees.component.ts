import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent {

  today: Date = new Date();

  constructor(private router: Router) {}

addEmployee() {
  this.router.navigate(['/dashboard/add-employee']);
}

}