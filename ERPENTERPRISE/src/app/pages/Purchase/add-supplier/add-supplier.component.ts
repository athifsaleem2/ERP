import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SupplierService, Supplier } from '../../../core/services/supplier.service';

@Component({
  selector: 'app-add-supplier',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-supplier.component.html',
  styleUrl: './add-supplier.component.css'
})
export class AddSupplierComponent {
  supplier: Supplier = {
    name: '',
    contactPerson: '',
    phone: '',
    email: '',
    address: '',
    gstNumber: ''
  };

  isSubmitting = false;

  constructor(
    private supplierService: SupplierService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (!this.supplier.name || !this.supplier.phone) {
      alert('Please fill in required fields (Name and Phone).');
      return;
    }

    this.isSubmitting = true;
    this.supplierService.createSupplier(this.supplier).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(['/dashboard/suppliers']);
      },
      error: (err) => {
        this.isSubmitting = false;
        console.error('Error saving supplier:', err);
        alert('Failed to save supplier. Please try again.');
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/dashboard/suppliers']);
  }
}
