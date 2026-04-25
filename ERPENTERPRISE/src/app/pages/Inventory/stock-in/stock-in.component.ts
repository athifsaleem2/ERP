import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryService, StockEntry } from '../../../core/services/inventory.service';
import { ProductService, Product } from '../../../core/services/product.service';
import { SupplierService } from '../../../core/services/supplier.service';

@Component({
  selector: 'app-stock-in',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stock-in.component.html',
  styleUrls: ['./stock-in.component.css']
})
export class StockInComponent implements OnInit {

  entry: StockEntry = {
    productId: 0,
    productName: '',
    type: 'IN',
    quantity: 1,
    date: new Date().toISOString().split('T')[0],
    reference: '',
    toLocation: 'Main Warehouse',
    notes: ''
  };

  products: Product[] = [];
  suppliers: any[] = [];
  recentEntries: StockEntry[] = [];
  
  isSaving = false;
  isBrowser: boolean;

  constructor(
    private inventoryService: InventoryService,
    private productService: ProductService,
    private supplierService: SupplierService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { 
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.loadData();
    }
  }

  loadData() {
    this.productService.getProducts().subscribe(data => this.products = data);
    this.supplierService.getSuppliers().subscribe(data => this.suppliers = data);
    this.loadRecentEntries();
  }

  loadRecentEntries() {
    this.inventoryService.getRecentEntries().subscribe(data => {
      // Only show IN entries for this page
      this.recentEntries = data.filter(e => e.type === 'IN').slice(0, 5);
    });
  }

  onProductChange() {
    const selected = this.products.find(p => p.id === this.entry.productId);
    if (selected) {
      this.entry.productName = selected.name;
    }
  }

  saveStockIn() {
    if (!this.entry.productId || this.entry.quantity <= 0 || !this.entry.reference) {
      alert('Please fill all required fields');
      return;
    }

    this.isSaving = true;
    this.inventoryService.addStockEntry(this.entry).subscribe({
      next: () => {
        alert('Stock received successfully!');
        this.resetForm();
        this.loadRecentEntries();
        this.isSaving = false;
      },
      error: (err) => {
        console.error('Error saving stock in', err);
        this.isSaving = false;
      }
    });
  }

  resetForm() {
    this.entry = {
      productId: 0,
      productName: '',
      type: 'IN',
      quantity: 1,
      date: new Date().toISOString().split('T')[0],
      reference: '',
      toLocation: 'Main Warehouse',
      notes: ''
    };
  }
}