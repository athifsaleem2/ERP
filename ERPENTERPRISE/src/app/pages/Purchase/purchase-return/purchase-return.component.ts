import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PurchaseReturnService, PurchaseReturn } from '../../../core/services/purchase-return.service';
import { SupplierService } from '../../../core/services/supplier.service';
import { PurchaseInvoiceService } from '../../../core/services/purchase-invoice.service';

@Component({
  selector: 'app-purchase-return',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './purchase-return.component.html',
  styleUrls: ['./purchase-return.component.css']
})
export class PurchaseReturnComponent implements OnInit {
  today: Date = new Date();
  suppliers: any[] = [];
  isFetchingInvoice = false;
  invoiceFetchError = '';
  invoiceFetched = false;
  supplierName = '';

  private debounceTimer: any;

  purchaseReturn: PurchaseReturn = {
    returnNumber: 'PR-' + (Math.floor(Math.random() * 9000) + 1000),
    invoiceNumber: '',
    supplierId: undefined,
    returnDate: new Date().toISOString().split('T')[0],
    reason: 'Damaged',
    totalAmount: 0,
    items: []
  };

  constructor(
    private purchaseReturnService: PurchaseReturnService,
    private supplierService: SupplierService,
    private purchaseInvoiceService: PurchaseInvoiceService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadSuppliers();
    this.addItem();
  }

  loadSuppliers() {
    this.supplierService.getSuppliers().subscribe(data => this.suppliers = data);
  }

  /** Called on every keystroke via (input) event with debounce */
  onInvoiceInput() {
    clearTimeout(this.debounceTimer);
    this.invoiceFetchError = '';
    this.invoiceFetched = false;

    if (!this.purchaseReturn.invoiceNumber || this.purchaseReturn.invoiceNumber.trim().length < 3) {
      return;
    }

    this.debounceTimer = setTimeout(() => {
      this.fetchInvoiceData();
    }, 600);
  }

  /** Also allow triggering on blur (Enter key / tab out) */
  onInvoiceNumberChange() {
    clearTimeout(this.debounceTimer);
    if (this.purchaseReturn.invoiceNumber && this.purchaseReturn.invoiceNumber.trim().length >= 3) {
      this.fetchInvoiceData();
    }
  }

  fetchInvoiceData() {
    this.isFetchingInvoice = true;
    this.invoiceFetchError = '';

    this.purchaseInvoiceService.getInvoiceByNumber(this.purchaseReturn.invoiceNumber.trim()).subscribe({
      next: (invoice) => {
        this.isFetchingInvoice = false;
        if (invoice) {
          // Auto-fill supplier
          this.purchaseReturn.supplierId = invoice.supplierId;
          this.updateSupplierName();

          // Auto-fill items from invoice
          this.purchaseReturn.items = invoice.items.map(item => ({
            productName: item.productName || '',
            quantity: item.quantity || 1,
            price: item.costPrice || 0,
            taxPercentage: 18,
            total: 0
          }));

          this.calculateTotals();
          this.invoiceFetched = true;
          this.invoiceFetchError = '';
        } else {
          this.invoiceFetchError = 'Invoice not found. Please check the number.';
          this.resetInvoiceFields();
        }
      },
      error: () => {
        this.isFetchingInvoice = false;
        this.invoiceFetchError = 'Invoice not found. Please check the number.';
        this.resetInvoiceFields();
      }
    });
  }

  updateSupplierName() {
    const supplier = this.suppliers.find(s => s.id === this.purchaseReturn.supplierId);
    this.supplierName = supplier ? supplier.name : '';
  }

  resetInvoiceFields() {
    this.purchaseReturn.supplierId = undefined;
    this.supplierName = '';
    this.invoiceFetched = false;
    this.purchaseReturn.items = [];
    this.addItem();
    this.calculateTotals();
  }

  addItem() {
    this.purchaseReturn.items.push({
      productName: '',
      quantity: 1,
      price: 0,
      taxPercentage: 18,
      total: 0
    });
  }

  removeItem(index: number) {
    this.purchaseReturn.items.splice(index, 1);
    this.calculateTotals();
  }

  calculateTotals() {
    let total = 0;
    this.purchaseReturn.items.forEach(item => {
      const subtotal = item.quantity * item.price;
      const tax = (subtotal * item.taxPercentage) / 100;
      item.total = subtotal + tax;
      total += item.total;
    });
    this.purchaseReturn.totalAmount = total;
  }

  get subtotal(): number {
    return this.purchaseReturn.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  }

  get taxTotal(): number {
    return this.purchaseReturn.items.reduce((sum, item) => {
      const sub = item.quantity * item.price;
      return sum + (sub * item.taxPercentage / 100);
    }, 0);
  }

  processReturn() {
    if (!this.purchaseReturn.invoiceNumber || !this.purchaseReturn.supplierId || this.purchaseReturn.items.length === 0) {
      alert('Please fill all required fields and ensure items are loaded.');
      return;
    }

    this.purchaseReturnService.createReturn(this.purchaseReturn).subscribe({
      next: () => {
        alert('Purchase Return processed successfully!');
        this.router.navigate(['/dashboard/purchase-return-list']);
      },
      error: (err) => alert('Error processing return: ' + err.message)
    });
  }

  cancel() {
    this.router.navigate(['/dashboard/purchase-return-list']);
  }
}