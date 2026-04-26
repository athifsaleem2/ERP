import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../core/services/product.service';
import { InventoryService } from '../../../core/services/inventory.service';
import { CategoryService } from '../../../core/services/category.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-inventory-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory-report.component.html',
  styleUrls: ['./inventory-report.component.css']
})
export class InventoryReportComponent implements OnInit {
  today = new Date();
  loading = false;

  filterStatus = '';
  searchProduct = '';

  stockSummary: any[] = [];
  categories: any[] = [];

  constructor(
    private productService: ProductService,
    private inventoryService: InventoryService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.categoryService.getCategories().subscribe({ next: cats => {
      this.categories = cats;
      this.productService.getProducts().subscribe({ next: products => {
        this.inventoryService.getStockReport(products, cats).subscribe({
          next: summary => { this.stockSummary = summary; this.loading = false; },
          error: () => {
            // Fallback: show products with stockQuantity field
            this.stockSummary = products.map(p => ({
              productId: p.id,
              productName: p.name,
              category: p.category || 'Uncategorized',
              totalIn: p.stockQuantity || 0,
              totalOut: 0,
              availableStock: p.stockQuantity || 0,
              status: (p.stockQuantity || 0) === 0 ? 'Out of Stock' : (p.stockQuantity || 0) <= 10 ? 'Low Stock' : 'In Stock'
            }));
            this.loading = false;
          }
        });
      }, error: () => this.loading = false });
    }, error: () => this.loading = false });
  }

  get filtered() {
    return this.stockSummary.filter(p => {
      const matchSearch = !this.searchProduct || (p.productName || '').toLowerCase().includes(this.searchProduct.toLowerCase());
      const matchStatus = !this.filterStatus  || p.status === this.filterStatus;
      return matchSearch && matchStatus;
    });
  }

  get totalProducts()   { return this.stockSummary.length; }
  get lowStockCount()   { return this.stockSummary.filter(p => p.status === 'Low Stock').length; }
  get outOfStockCount() { return this.stockSummary.filter(p => p.status === 'Out of Stock').length; }

  statusCls(s: string) {
    return s === 'In Stock' ? 'in' : s === 'Low Stock' ? 'low' : 'out';
  }

  clear() { this.filterStatus = ''; this.searchProduct = ''; }
}