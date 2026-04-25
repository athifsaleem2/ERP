import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SalesReturnService, SalesReturn, SalesReturnItem } from '../../../core/services/sales-return.service';
import { CustomerService } from '../../../core/services/customer.service';
import { SalesInvoiceService } from '../../../core/services/sales-invoice.service';

@Component({
  selector: 'app-sales-return',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sales-return.component.html',
  styleUrls: ['./sales-return.component.css']
})
export class SalesReturnComponent implements OnInit {
  today: Date = new Date();
  customers: any[] = [];
  
  salesReturn: SalesReturn = {
    returnNumber: 'SR-' + (Math.floor(Math.random() * 9000) + 1000),
    invoiceNumber: '',
    customerName: '',
    returnDate: new Date().toISOString().split('T')[0],
    reason: 'Damaged',
    totalAmount: 0,
    items: []
  };

  constructor(
    private salesReturnService: SalesReturnService,
    private customerService: CustomerService,
    private salesInvoiceService: SalesInvoiceService
  ) { }

  ngOnInit() {
    this.loadCustomers();
    this.addItem(); // Add initial row
  }

  loadCustomers() {
    this.customerService.getCustomers().subscribe(data => this.customers = data);
  }

  addItem() {
    this.salesReturn.items.push({
      productName: '',
      quantity: 1,
      price: 0,
      taxPercentage: 18,
      total: 0
    });
  }

  removeItem(index: number) {
    this.salesReturn.items.splice(index, 1);
    this.calculateTotals();
  }

  calculateTotals() {
    let total = 0;
    this.salesReturn.items.forEach(item => {
      const subtotal = item.quantity * item.price;
      const tax = (subtotal * item.taxPercentage) / 100;
      item.total = subtotal + tax;
      total += item.total;
    });
    this.salesReturn.totalAmount = total;
  }

  fetchInvoiceDetails() {
    if (!this.salesReturn.invoiceNumber) return;

    this.salesInvoiceService.getInvoices().subscribe({
      next: (invoices) => {
        const found = invoices.find(i => i.invoiceNumber.toLowerCase() === this.salesReturn.invoiceNumber.toLowerCase());
        if (found) {
          this.salesReturn.customerName = found.customerName;
          this.salesReturn.items = [];
          
          found.items.forEach(item => {
            this.salesReturn.items.push({
              productName: item.productName,
              quantity: item.quantity,
              price: item.price,
              taxPercentage: item.taxPercentage || 18,
              total: item.total
            });
          });
          
          this.calculateTotals();
        }
      },
      error: (err) => console.error('Error fetching invoice details:', err)
    });
  }

  processReturn() {
    if (!this.salesReturn.invoiceNumber || !this.salesReturn.customerName || this.salesReturn.items.length === 0) {
      alert('Please fill all required fields');
      return;
    }

    this.salesReturnService.createReturn(this.salesReturn).subscribe({
      next: (res) => {
        alert('Sales Return processed successfully');
        // Reset or navigate
      },
      error: (err) => alert('Error processing return: ' + (err.error?.message || err.message))
    });
  }
}