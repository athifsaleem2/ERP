import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SalesInvoiceService, SalesInvoice, SalesInvoiceItem } from '../../../core/services/sales-invoice.service';

@Component({
  selector: 'app-sales-invoice',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './sales-invoice.component.html',
  styleUrls: ['./sales-invoice.component.css']
})
export class SalesInvoiceComponent implements OnInit {
  today: Date = new Date();
  isBrowser: boolean;
  
  invoice: SalesInvoice = {
    invoiceNumber: '',
    customerName: '',
    paymentMode: 'Cash',
    dueDate: new Date().toISOString().split('T')[0],
    subtotal: 0,
    discount: 0,
    tax: 0,
    grandTotal: 0,
    notes: '',
    items: []
  };

  constructor(
    private salesInvoiceService: SalesInvoiceService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.invoice.invoiceNumber = 'INV-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
      this.addItem(); 
    }
  }

  addItem(): void {
    this.invoice.items.push({
      productName: '',
      quantity: 1,
      price: 0,
      taxPercentage: 0,
      total: 0
    });
    this.calculateTotals();
  }

  removeItem(index: number): void {
    if (this.invoice.items.length > 1) {
      this.invoice.items.splice(index, 1);
      this.calculateTotals();
    }
  }

  calculateTotals(): void {
    this.invoice.subtotal = 0;
    this.invoice.tax = 0;

    this.invoice.items.forEach((item: SalesInvoiceItem) => {
      const itemBase = item.quantity * item.price;
      const itemTax = (itemBase * item.taxPercentage) / 100;
      item.total = itemBase + itemTax;
      
      this.invoice.subtotal += itemBase;
      this.invoice.tax += itemTax;
    });

    this.invoice.grandTotal = (this.invoice.subtotal + this.invoice.tax) - this.invoice.discount;
  }

  saveInvoice(): void {
    if (!this.invoice.customerName) {
      alert('Please enter customer name');
      return;
    }

    if (this.invoice.items.some((i: SalesInvoiceItem) => !i.productName)) {
      alert('Please enter product names for all items');
      return;
    }

    this.salesInvoiceService.createInvoice(this.invoice).subscribe({
      next: (res: SalesInvoice) => {
        alert('Invoice saved successfully!');
        console.log('Saved:', res);
        // Reset or redirect
      },
      error: (err: any) => {
        alert('Error saving invoice: ' + (err.error || err.message));
        console.error('Error:', err);
      }
    });
  }
}