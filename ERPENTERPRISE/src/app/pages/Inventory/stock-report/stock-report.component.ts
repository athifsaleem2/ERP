import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryService, StockSummary } from '../../../core/services/inventory.service';
import { ProductService } from '../../../core/services/product.service';
import { CategoryService } from '../../../core/services/category.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-stock-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stock-report.component.html',
  styleUrls: ['./stock-report.component.css']
})
export class StockReportComponent implements OnInit {

  stockData: StockSummary[] = [];
  filteredData: StockSummary[] = [];

  categories: string[] = [];
  selectedCategory = '';
  lowStockThreshold: number | null = null;
  
  isLoading = false;
  isBrowser: boolean;

  constructor(
    private inventoryService: InventoryService,
    private productService: ProductService,
    private categoryService: CategoryService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { 
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.loadReport();
    }
  }

  loadReport() {
    this.isLoading = true;

    // Combine data sources
    combineLatest([
      this.productService.getProducts(),
      this.categoryService.getCategories()
    ]).subscribe({
      next: ([products, backendCategories]) => {
        // Load report from InventoryService using combined data
        this.inventoryService.getStockReport(products, backendCategories).subscribe({
          next: (summaries) => {
            this.stockData = summaries;
            this.filteredData = summaries;
            
            // Extract unique categories for filter dropdown
            const cats = new Set(summaries.map(s => s.category));
            this.categories = Array.from(cats).sort();

            this.isLoading = false;
          },
          error: (err) => {
            console.error('Error calculating stock report', err);
            this.isLoading = false;
          }
        });
      },
      error: (err) => {
        console.error('Error fetching base data for report', err);
        this.isLoading = false;
      }
    });
  }

  applyFilter() {
    this.filteredData = this.stockData.filter(item => {
      let matchCategory = true;
      let matchThreshold = true;

      if (this.selectedCategory) {
        matchCategory = item.category === this.selectedCategory;
      }

      if (this.lowStockThreshold !== null && this.lowStockThreshold !== undefined) {
        matchThreshold = item.availableStock <= this.lowStockThreshold;
      }

      return matchCategory && matchThreshold;
    });
  }

  // Summary widgets data
  get totalItems() { return this.stockData.length; }
  get outOfStock() { return this.stockData.filter(s => s.status === 'Out of Stock').length; }
  get lowStock() { return this.stockData.filter(s => s.status === 'Low Stock').length; }
  get healthyStock() { return this.stockData.filter(s => s.status === 'In Stock').length; }
}