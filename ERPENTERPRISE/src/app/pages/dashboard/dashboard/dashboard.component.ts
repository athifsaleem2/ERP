import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { Chart } from 'chart.js/auto';
import { SalesInvoiceService } from '../../../core/services/sales-invoice.service';
import { PurchaseInvoiceService } from '../../../core/services/purchase-invoice.service';
import { ProductService } from '../../../core/services/product.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  totalSales: number = 0;
  totalPurchases: number = 0;
  totalStock: number = 0;
  lowStockItems: number = 0;
  today: Date = new Date();

  constructor(
    private salesService: SalesInvoiceService,
    private purchaseService: PurchaseInvoiceService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    forkJoin({
      sales: this.salesService.getInvoices(),
      purchases: this.purchaseService.getInvoices(),
      products: this.productService.getProducts()
    }).subscribe({
      next: (data) => {
        // Calculate Totals
        this.totalSales = data.sales.reduce((sum: number, inv: any) => sum + (inv.grandTotal || 0), 0);
        this.totalPurchases = data.purchases.reduce((sum: number, inv: any) => sum + (inv.grandTotal || 0), 0);
        this.totalStock = data.products.reduce((sum: number, prod: any) => sum + (prod.stockQuantity || 0), 0);
        this.lowStockItems = data.products.filter((prod: any) => (prod.stockQuantity || 0) < 10).length;

        this.initChart(data.sales, data.purchases);
      },
      error: (err) => console.error('Error loading dashboard data:', err)
    });
  }

  initChart(sales: any[], purchases: any[]) {
    // Basic chart showing last few entries
    const labels = sales.slice(-7).map(s => s.invoiceNumber);
    const salesData = sales.slice(-7).map(s => s.grandTotal);

    new Chart("salesChart", {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Recent Sales',
          data: salesData,
          backgroundColor: 'rgba(79, 70, 229, 0.6)',
          borderColor: '#4f46e5',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        }
      }
    });
  }
}
