import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SalesInvoiceService, SalesInvoice } from '../../../core/services/sales-invoice.service';

@Component({
  selector: 'app-sales-invoice-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sales-invoice-list.component.html',
  styleUrls: ['./sales-invoice-list.component.css']
})
export class SalesInvoiceListComponent implements OnInit {
  invoices: SalesInvoice[] = [];
  isBrowser: boolean;

  constructor(
    private salesInvoiceService: SalesInvoiceService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.loadInvoices();
    }
  }

  loadInvoices(): void {
    this.salesInvoiceService.getInvoices().subscribe({
      next: (data) => this.invoices = data,
      error: (err) => console.error('Error loading invoices:', err)
    });
  }

  navigateToAdd(): void {
    this.router.navigate(['/dashboard/sales-invoice']);
  }
}
