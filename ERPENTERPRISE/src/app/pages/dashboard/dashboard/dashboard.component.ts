import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { Chart, registerables } from 'chart.js/auto';
import { SalesInvoiceService } from '../../../core/services/sales-invoice.service';
import { PurchaseInvoiceService } from '../../../core/services/purchase-invoice.service';
import { ProductService, Product } from '../../../core/services/product.service';
import { forkJoin, Subscription, timer } from 'rxjs';
import { RouterModule } from '@angular/router';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy {
  totalSales: number = 0;
  totalPurchases: number = 0;
  totalStock: number = 0;
  lowStockItems: number = 0;
  today: Date = new Date();
  greeting: string = 'Welcome Back';
  currentTime: string = '';

  recentTransactions: any[] = [];
  topProducts: any[] = [];
  criticalItems: Product[] = [];

  private timerSubscription?: Subscription;
  private chartInstance?: Chart;

  constructor(
    private salesService: SalesInvoiceService,
    private purchaseService: PurchaseInvoiceService,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.updateTimeAndGreeting();
    this.loadData();

    // Update time every second
    this.timerSubscription = timer(0, 1000).subscribe(() => {
      const now = new Date();
      this.currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    });
  }

  ngOnDestroy() {
    if (this.timerSubscription) this.timerSubscription.unsubscribe();
    if (this.chartInstance) this.chartInstance.destroy();
  }

  updateTimeAndGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) this.greeting = 'Good Morning';
    else if (hour < 17) this.greeting = 'Good Afternoon';
    else this.greeting = 'Good Evening';
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

        // Critical Stock Items
        this.criticalItems = data.products
          .filter((p: any) => (p.stockQuantity || 0) < 10)
          .sort((a, b) => (a.stockQuantity || 0) - (b.stockQuantity || 0))
          .slice(0, 4);

        // Recent Transactions (Combined)
        const combined = [
          ...data.sales.map(s => ({ ...s, type: 'SALE', color: 'emerald', displayDate: s.dueDate })),
          ...data.purchases.map(p => ({ ...p, type: 'PURCHASE', color: 'rose', displayDate: p.date }))
        ].sort((a: any, b: any) => new Date(b.displayDate || '').getTime() - new Date(a.displayDate || '').getTime());

        this.recentTransactions = combined.slice(0, 6);

        // Top Selling Products (simplified logic)
        const productCounts: any = {};
        data.sales.forEach((inv: any) => {
          inv.items?.forEach((item: any) => {
            productCounts[item.productName] = (productCounts[item.productName] || 0) + item.quantity;
          });
        });

        this.topProducts = Object.keys(productCounts)
          .map(name => ({ name, count: productCounts[name] }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 4);

        this.initChart(data.sales, data.purchases);
      },
      error: (err) => console.error('Error loading dashboard data:', err)
    });
  }

  initChart(sales: any[], purchases: any[]) {
    // Destroy previous chart if exists
    if (this.chartInstance) this.chartInstance.destroy();

    const canvas = document.getElementById('salesChart') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Create Gradients
    const gradientSales = ctx.createLinearGradient(0, 0, 0, 400);
    gradientSales.addColorStop(0, 'rgba(79, 70, 229, 0.4)');
    gradientSales.addColorStop(1, 'rgba(79, 70, 229, 0.0)');

    const gradientPurchases = ctx.createLinearGradient(0, 0, 0, 400);
    gradientPurchases.addColorStop(0, 'rgba(244, 63, 94, 0.4)');
    gradientPurchases.addColorStop(1, 'rgba(244, 63, 94, 0.0)');

    // Last 10 transactions or 7 days labels
    const labels = sales.slice(-7).map(s => s.invoiceNumber);
    const salesData = sales.slice(-7).map(s => s.grandTotal);
    const purchasesData = purchases.slice(-7).map(p => p.grandTotal);

    this.chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Revenue',
            data: salesData,
            fill: true,
            backgroundColor: gradientSales,
            borderColor: '#4f46e5',
            borderWidth: 3,
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: '#4f46e5'
          },
          {
            label: 'Expenses',
            data: purchasesData,
            fill: true,
            backgroundColor: gradientPurchases,
            borderColor: '#f43f5e',
            borderWidth: 3,
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: '#f43f5e'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            align: 'end',
            labels: {
              usePointStyle: true,
              font: { size: 10, weight: 600 }
            }
          },
          tooltip: {
            padding: 12,
            backgroundColor: 'rgba(15, 23, 42, 0.9)',
            titleFont: { size: 12, weight: 'bold' },
            bodyFont: { size: 12 },
            cornerRadius: 8
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { display: true, color: 'rgba(226, 232, 240, 0.4)' },
            ticks: { font: { size: 10 } }
          },
          x: {
            grid: { display: false },
            ticks: { font: { size: 10 } }
          }
        }
      }
    });
  }
}
