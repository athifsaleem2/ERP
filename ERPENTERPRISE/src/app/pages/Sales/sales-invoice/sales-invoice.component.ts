import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SalesInvoiceService, SalesInvoice, SalesInvoiceItem } from '../../../core/services/sales-invoice.service';
import { ProductService, Product } from '../../../core/services/product.service';
import { CustomerService, Customer } from '../../../core/services/customer.service';

@Component({
  selector: 'app-sales-invoice',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './sales-invoice.component.html',
  styleUrl: './sales-invoice.component.css'
})
export class SalesInvoiceComponent implements OnInit {
  invoices: SalesInvoice[] = [];
  isBrowser: boolean;
  today: Date = new Date();
  
  // Data for selections
  products: Product[] = [];
  customers: Customer[] = [];

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
    private productService: ProductService,
    private customerService: CustomerService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.invoice.invoiceNumber = 'INV-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
      this.addItem();
      this.loadSelectionData();
    }
  }

  loadSelectionData(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        console.log('Products loaded:', data);
      },
      error: (err) => console.error('Error loading products:', err)
    });

    this.customerService.getCustomers().subscribe({
      next: (data) => {
        this.customers = data;
        console.log('Customers loaded:', data);
      },
      error: (err) => console.error('Error loading customers:', err)
    });
  }

  onProductChange(item: SalesInvoiceItem): void {
    console.log('Product changed to ID:', item.productId);
    const selectedProd = this.products.find(p => p.id === item.productId);
    if (selectedProd) {
      item.productName = selectedProd.name;
      item.price = selectedProd.price;
      item.taxPercentage = selectedProd.taxRate;
      console.log('Auto-filling:', { price: item.price, tax: item.taxPercentage });
      this.calculateTotals();
    }
  }

  onCustomerChange(event: any): void {
    const customerName = event.target.value;
    const selectedCust = this.customers.find(c => c.name === customerName);
    if (selectedCust) {
      this.invoice.customerId = selectedCust.id;
      this.invoice.customerName = selectedCust.name;
      console.log('Selected Customer ID:', selectedCust.id);
    } else {
      this.invoice.customerId = undefined;
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
        if (this.isBrowser) {
          // Regenerate invoice number for next save
          this.invoice.invoiceNumber = 'INV-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
          this.invoice.customerName = '';
          this.invoice.items = [];
          this.addItem();
        }
      },
      error: (err: any) => {
        const errorMsg = err.error?.message || (typeof err.error === 'string' ? err.error : err.message);
        alert('Error saving invoice: ' + errorMsg);
        console.error('Error:', err);
      }
    });
  }
}