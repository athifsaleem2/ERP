import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PurchaseInvoiceService, PurchaseInvoice, PurchaseInvoiceItem } from '../../../core/services/purchase-invoice.service';
import { SupplierService, Supplier } from '../../../core/services/supplier.service';
import { ProductService, Product } from '../../../core/services/product.service';

@Component({
  selector: 'app-purchase-invoice',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './purchase-invoice.component.html',
  styleUrl: './purchase-invoice.component.css'
})
export class PurchaseInvoiceComponent implements OnInit {
  invoice: PurchaseInvoice = {
    invoiceNumber: '',
    supplierId: 0,
    subtotal: 0,
    tax: 0,
    grandTotal: 0,
    items: []
  };

  suppliers: Supplier[] = [];
  products: Product[] = [];
  isSaving = false;
  today: Date = new Date();

  constructor(
    private purchaseService: PurchaseInvoiceService,
    private supplierService: SupplierService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSuppliers();
    this.loadProducts();
    this.addItem(); // Add initial item row
    this.generateInvoiceNumber();
  }

  loadSuppliers(): void {
    this.supplierService.getSuppliers().subscribe(data => this.suppliers = data);
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(data => this.products = data);
  }

  generateInvoiceNumber(): void {
    const date = new Date();
    const prefix = 'PUR';
    const timestamp = date.getTime().toString().slice(-6);
    this.invoice.invoiceNumber = `${prefix}-${timestamp}`;
  }

  addItem(): void {
    const newItem: PurchaseInvoiceItem = {
      productId: 0,
      productName: '',
      quantity: 1,
      costPrice: 0,
      total: 0
    };
    this.invoice.items.push(newItem);
  }

  removeItem(index: number): void {
    this.invoice.items.splice(index, 1);
    this.calculateTotals();
  }

  onProductChange(item: PurchaseInvoiceItem): void {
    const selectedProduct = this.products.find(p => p.id === Number(item.productId));
    if (selectedProduct) {
      item.productName = selectedProduct.name;
      item.costPrice = selectedProduct.price; // Default to current price, but user can change it
      this.calculateTotals();
    }
  }

  calculateTotals(): void {
    let subtotal = 0;
    this.invoice.items.forEach(item => {
      item.total = item.quantity * item.costPrice;
      subtotal += item.total;
    });

    this.invoice.subtotal = subtotal;
    this.invoice.tax = subtotal * 0.18; // Default 18% tax for demo
    this.invoice.grandTotal = subtotal + this.invoice.tax;
  }

  saveInvoice(): void {
    if (!this.invoice.supplierId || this.invoice.items.length === 0) {
      alert('Please select a supplier and add at least one item.');
      return;
    }

    this.isSaving = true;
    this.purchaseService.createInvoice(this.invoice).subscribe({
      next: () => {
        this.isSaving = false;
        alert('Purchase invoice saved and stock updated!');
        this.router.navigate(['/dashboard/home']);
      },
      error: (err) => {
        this.isSaving = false;
        console.error('Error saving purchase invoice:', err);
        alert('Failed to save invoice.');
      }
    });
  }
}