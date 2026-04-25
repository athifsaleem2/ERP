import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryService, StockEntry } from '../../../core/services/inventory.service';
import { ProductService, Product } from '../../../core/services/product.service';

@Component({
  selector: 'app-stock-out',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stock-out.component.html',
  styleUrls: ['./stock-out.component.css']
})
export class StockOutComponent implements OnInit {

  entry: StockEntry = {
    productId: 0,
    productName: '',
    type: 'OUT',
    quantity: 1,
    date: new Date().toISOString().split('T')[0],
    reference: '',
    fromLocation: 'Main Warehouse',
    notes: ''
  };

  products: Product[] = [];
  recentEntries: StockEntry[] = [];
  
  isSaving = false;
  isBrowser: boolean;

  // Typical reasons for stock out
  reasons = [
    'Consumption / Processing',
    'Damage / Expiry',
    'Theft / Loss',
    'Internal Use',
    'Correction / Adjustment'
  ];

  constructor(
    private inventoryService: InventoryService,
    private productService: ProductService,
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
    this.loadRecentEntries();
  }

  loadRecentEntries() {
    this.inventoryService.getRecentEntries().subscribe(data => {
      // Only show OUT entries
      this.recentEntries = data.filter(e => e.type === 'OUT').slice(0, 5);
    });
  }

  onProductChange() {
    const selected = this.products.find(p => p.id === this.entry.productId);
    if (selected) {
      this.entry.productName = selected.name;
    }
  }

  saveStockOut() {
    if (!this.entry.productId || this.entry.quantity <= 0 || !this.entry.reference) {
      alert('Please fill all required fields, including Reason.');
      return;
    }

    this.isSaving = true;
    this.inventoryService.addStockEntry(this.entry).subscribe({
      next: () => {
        alert('Stock deduction recorded successfully!');
        this.resetForm();
        this.loadRecentEntries();
        this.isSaving = false;
      },
      error: (err) => {
        console.error('Error recording stock out', err);
        this.isSaving = false;
      }
    });
  }

  resetForm() {
    this.entry = {
      productId: 0,
      productName: '',
      type: 'OUT',
      quantity: 1,
      date: new Date().toISOString().split('T')[0],
      reference: '',
      fromLocation: 'Main Warehouse',
      notes: ''
    };
  }
}