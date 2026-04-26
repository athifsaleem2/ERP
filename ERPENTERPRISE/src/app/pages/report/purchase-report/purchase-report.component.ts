import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PurchaseInvoiceService } from '../../../core/services/purchase-invoice.service';
import { PurchaseReturnService } from '../../../core/services/purchase-return.service';
import { SupplierService } from '../../../core/services/supplier.service';

@Component({
  selector: 'app-purchase-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './purchase-report.component.html',
  styleUrls: ['./purchase-report.component.css']
})
export class PurchaseReportComponent implements OnInit {
  today = new Date();
  loading = false;

  fromDate = '';
  toDate = '';
  filterSupplier = '';

  allInvoices: any[] = [];
  allReturns: any[] = [];
  suppliers: any[] = [];

  constructor(
    private purchaseService: PurchaseInvoiceService,
    private returnService: PurchaseReturnService,
    private supplierService: SupplierService
  ) {}

  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    let done = 0;
    const finish = () => { if (++done >= 3) this.loading = false; };

    this.purchaseService.getInvoices().subscribe({ next: d => { this.allInvoices = d; finish(); }, error: finish });
    this.returnService.getReturns().subscribe({ next: d => { this.allReturns = d; finish(); }, error: finish });
    this.supplierService.getSuppliers().subscribe({ next: d => { this.suppliers = d; finish(); }, error: finish });
  }

  get filtered() {
    return this.allInvoices.filter(inv => {
      const date = new Date(inv.date || inv.createdAt);
      const matchFrom = !this.fromDate || date >= new Date(this.fromDate);
      const matchTo   = !this.toDate   || date <= new Date(this.toDate);
      const matchSup  = !this.filterSupplier || (inv.supplierName || '').toLowerCase().includes(this.filterSupplier.toLowerCase());
      return matchFrom && matchTo && matchSup;
    });
  }

  get totalPurchase()  { return this.filtered.reduce((s, i) => s + (i.grandTotal || 0), 0); }
  get totalReturns()   { return this.allReturns.reduce((s, r) => s + (r.totalAmount || r.grandTotal || 0), 0); }
  get netPurchase()    { return this.totalPurchase - this.totalReturns; }
  get invoiceCount()   { return this.filtered.length; }

  get bySupplier() {
    const map: Record<string, number> = {};
    this.filtered.forEach(inv => {
      const s = inv.supplierName || `Supplier #${inv.supplierId}` || 'Unknown';
      map[s] = (map[s] || 0) + (inv.grandTotal || 0);
    });
    return Object.entries(map).map(([label, amount]) => ({ label, amount }))
      .sort((a, b) => b.amount - a.amount).slice(0, 8);
  }

  clear() { this.fromDate = ''; this.toDate = ''; this.filterSupplier = ''; }
}