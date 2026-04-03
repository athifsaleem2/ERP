import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CustomerService, Customer } from '../../../core/services/customer.service';

@Component({
  selector: 'app-add-customer',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent {
  customer: Customer = {
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    gstNumber: ''
  };

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  saveCustomer(): void {
    if (!this.customer.name || !this.customer.phone) {
      alert('Name and Phone are required!');
      return;
    }

    this.customerService.createCustomer(this.customer).subscribe({
      next: (res) => {
        alert('Customer saved successfully!');
        this.router.navigate(['/dashboard/customers']);
      },
      error: (err) => {
        alert('Error saving customer: ' + (err.error?.message || err.message));
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/dashboard/customers']);
  }
}
