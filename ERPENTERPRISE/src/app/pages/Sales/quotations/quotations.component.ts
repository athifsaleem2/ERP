import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QuotationService, Quotation, QuotationItem } from '../../../core/services/quotation.service';
import { CustomerService } from '../../../core/services/customer.service';
import { ProductService, Product } from '../../../core/services/product.service';

@Component({
  selector: 'app-quotations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quotations.component.html',
  styleUrl: './quotations.component.css'
})
export class QuotationsComponent implements OnInit {
  today: Date = new Date();
  customers: any[] = [];
  products: Product[] = [];
  
  quotation: Quotation = {
    quotationNumber: 'QT-' + (Math.floor(Math.random() * 9000) + 1000),
    customerName: '',
    date: new Date().toISOString().split('T')[0],
    expiryDate: '',
    subtotal: 0,
    discount: 0,
    tax: 0,
    grandTotal: 0,
    items: []
  };

  constructor(
    private quotationService: QuotationService,
    private customerService: CustomerService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.loadCustomers();
    this.loadProducts();
    this.addItem();
  }

  loadCustomers() {
    this.customerService.getCustomers().subscribe(data => this.customers = data);
  }

  loadProducts() {
    this.productService.getProducts().subscribe(data => this.products = data);
  }

  onProductChange(item: QuotationItem) {
    const selectedProd = this.products.find(p => p.id === item.productId);
    if (selectedProd) {
      item.productName = selectedProd.name;
      item.price = selectedProd.price;
      this.calculateTotals();
    }
  }

  addItem() {
    this.quotation.items.push({
      productName: '',
      quantity: 1,
      price: 0,
      total: 0
    });
  }

  removeItem(index: number) {
    this.quotation.items.splice(index, 1);
    this.calculateTotals();
  }

  calculateTotals() {
    let subtotal = 0;
    this.quotation.items.forEach(item => {
      item.total = item.quantity * item.price;
      subtotal += item.total;
    });
    
    this.quotation.subtotal = subtotal;
    this.quotation.tax = subtotal * 0.18; // Default 18% tax
    this.quotation.grandTotal = (subtotal + this.quotation.tax) - this.quotation.discount;
  }

  saveQuotation() {
    if (!this.quotation.customerName || this.quotation.items.length === 0) {
      alert('Please fill required fields');
      return;
    }

    this.quotationService.createQuotation(this.quotation).subscribe({
      next: () => {
        alert('Quotation saved successfully');
      },
      error: (err) => alert('Error saving quotation: ' + err.message)
    });
  }
}
