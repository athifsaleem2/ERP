import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { PurchaseInvoiceService, PurchaseInvoice } from '../../../core/services/purchase-invoice.service';

@Component({
  selector: 'app-purchase-invoice-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './purchase-invoice-list.component.html',
  styleUrl: './purchase-invoice-list.component.css'
})
export class PurchaseInvoiceListComponent implements OnInit {
  invoices: PurchaseInvoice[] = [];
  isBrowser: boolean;

  constructor(
    private purchaseService: PurchaseInvoiceService,
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
    this.purchaseService.getInvoices().subscribe({
      next: (data) => this.invoices = data,
      error: (err) => console.error('Error loading purchase invoices:', err)
    });
  }

  navigateToAdd(): void {
    this.router.navigate(['/dashboard/purchase-invoice']);
  }
}
