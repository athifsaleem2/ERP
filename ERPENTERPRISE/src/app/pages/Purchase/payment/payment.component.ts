import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaymentService, Payment } from '../../../core/services/payment.service';
import { SupplierService } from '../../../core/services/supplier.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  today: Date = new Date();
  suppliers: any[] = [];
  
  payment: Payment = {
    paymentNumber: 'PAY-' + (Math.floor(Math.random() * 9000) + 1000),
    supplierId: undefined,
    paymentDate: new Date().toISOString().split('T')[0],
    paymentMode: 'Bank Transfer',
    amount: 0,
    referenceNo: '',
    remarks: ''
  };

  constructor(
    private paymentService: PaymentService,
    private supplierService: SupplierService
  ) { }

  ngOnInit() {
    this.loadSuppliers();
  }

  loadSuppliers() {
    this.supplierService.getSuppliers().subscribe(data => this.suppliers = data);
  }

  processPayment() {
    if (!this.payment.supplierId || this.payment.amount <= 0) {
      alert('Please fill required fields (Supplier and Amount)');
      return;
    }

    this.paymentService.createPayment(this.payment).subscribe({
      next: () => {
        alert('Payment processed successfully');
        // Reset or navigate
      },
      error: (err) => alert('Error processing payment: ' + err.message)
    });
  }
}