import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { PurchaseReturnService, PurchaseReturn } from '../../../core/services/purchase-return.service';
import { SupplierService } from '../../../core/services/supplier.service';

@Component({
  selector: 'app-purchase-return-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './purchase-return-list.component.html',
  styleUrl: './purchase-return-list.component.css'
})
export class PurchaseReturnListComponent implements OnInit {
  returns: PurchaseReturn[] = [];
  suppliers: any[] = [];
  isBrowser: boolean;

  constructor(
    private purchaseReturnService: PurchaseReturnService,
    private supplierService: SupplierService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.loadSuppliers();
      this.loadReturns();
    }
  }

  loadSuppliers(): void {
    this.supplierService.getSuppliers().subscribe({
      next: (data) => this.suppliers = data,
      error: (err) => console.error('Error loading suppliers:', err)
    });
  }

  loadReturns(): void {
    this.purchaseReturnService.getReturns().subscribe({
      next: (data) => this.returns = data,
      error: (err) => console.error('Error loading purchase returns:', err)
    });
  }

  getSupplierName(supplierId?: number): string {
    if (!supplierId) return '—';
    const supplier = this.suppliers.find(s => s.id === supplierId);
    return supplier ? supplier.name : '—';
  }

  navigateToAdd(): void {
    this.router.navigate(['/dashboard/purchase-return']);
  }

  getTotalAmount(): number {
    return this.returns.reduce((sum, r) => sum + (r.totalAmount || 0), 0);
  }

  deleteReturn(id: number | undefined): void {
    if (!id) return;
    if (confirm('Are you sure you want to delete this return?')) {
      this.purchaseReturnService.deleteReturn(id).subscribe({
        next: () => this.loadReturns(),
        error: (err) => console.error('Error deleting return:', err)
      });
    }
  }
}
