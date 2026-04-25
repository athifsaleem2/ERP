import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryService, StockEntry } from '../../../core/services/inventory.service';
import { ProductService, Product } from '../../../core/services/product.service';

@Component({
  selector: 'app-stock-transfer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stock-transfer.component.html',
  styleUrls: ['./stock-transfer.component.css']
})
export class StockTransferComponent implements OnInit {

  entry: StockEntry = {
    productId: 0,
    productName: '',
    type: 'TRANSFER',
    quantity: 1,
    date: new Date().toISOString().split('T')[0],
    fromLocation: '',
    toLocation: '',
    notes: '',
    reference: 'Internal Transfer'
  };

  products: Product[] = [];
  recentEntries: StockEntry[] = [];
  
  isSaving = false;
  isBrowser: boolean;

  // Typical locations for mock data
  locations = [
    'Main Warehouse',
    'Retail Store',
    'Secondary Storage',
    'Quarantine Area',
    'Dispatch Zone'
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
      // Only show TRANSFER entries
      this.recentEntries = data.filter(e => e.type === 'TRANSFER').slice(0, 5);
    });
  }

  onProductChange() {
    const selected = this.products.find(p => p.id === this.entry.productId);
    if (selected) {
      this.entry.productName = selected.name;
    }
  }

  swapLocations() {
    const temp = this.entry.fromLocation;
    this.entry.fromLocation = this.entry.toLocation;
    this.entry.toLocation = temp;
  }

  saveStockTransfer() {
    if (!this.entry.productId || this.entry.quantity <= 0 || !this.entry.fromLocation || !this.entry.toLocation) {
      alert('Please fill all required fields');
      return;
    }
    
    if (this.entry.fromLocation === this.entry.toLocation) {
      alert('Source and destination locations cannot be the same directly.');
      return;
    }

    this.isSaving = true;
    this.inventoryService.addStockEntry(this.entry).subscribe({
      next: () => {
        alert('Stock transfer recorded successfully!');
        this.resetForm();
        this.loadRecentEntries();
        this.isSaving = false;
      },
      error: (err) => {
        console.error('Error recording stock transfer', err);
        this.isSaving = false;
      }
    });
  }

  resetForm() {
    this.entry = {
      productId: 0,
      productName: '',
      type: 'TRANSFER',
      quantity: 1,
      date: new Date().toISOString().split('T')[0],
      fromLocation: '',
      toLocation: '',
      notes: '',
      reference: 'Internal Transfer'
    };
  }
}