import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SalesInvoiceService } from '../../../core/services/sales-invoice.service';
import { SalesReturnService } from '../../../core/services/sales-return.service';
import { CustomerService } from '../../../core/services/customer.service';

@Component({
  selector: 'app-sales-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.css']
})
export class SalesReportComponent implements OnInit {
  today = new Date();
  loading = false;

  fromDate = '';
  toDate = '';
  filterCustomer = '';
  filterStatus = '';

  allInvoices: any[] = [];
  allReturns: any[] = [];
  customers: any[] = [];

  constructor(
    private salesService: SalesInvoiceService,
    private returnService: SalesReturnService,
    private customerService: CustomerService
  ) {}

  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.salesService.getInvoices().subscribe({ next: d => { this.allInvoices = d; this.checkDone(); }, error: () => this.checkDone() });
    this.salesService.getReturns?.().subscribe({ next: d => this.allReturns = d, error: () => {} });
    this.returnService.getReturns().subscribe({ next: d => { this.allReturns = d; }, error: () => {} });
    this.customerService.getCustomers().subscribe({ next: d => { this.customers = d; this.checkDone(); }, error: () => this.checkDone() });
  }

  private _done = 0;
  checkDone() { if (++this._done >= 2) this.loading = false; }

  get filtered() {
    return this.allInvoices.filter(inv => {
      const date = new Date(inv.invoiceDate || inv.date);
      const matchFrom = !this.fromDate || date >= new Date(this.fromDate);
      const matchTo   = !this.toDate   || date <= new Date(this.toDate);
      const matchCust = !this.filterCustomer || (inv.customerName || '').toLowerCase().includes(this.filterCustomer.toLowerCase());
      const matchStatus = !this.filterStatus || (inv.status || '') === this.filterStatus;
      return matchFrom && matchTo && matchCust && matchStatus;
    });
  }

  get totalSales()     { return this.filtered.reduce((s, i) => s + (i.totalAmount || i.grandTotal || 0), 0); }
  get totalReturns()   { return this.allReturns.reduce((s, r) => s + (r.totalAmount || r.grandTotal || 0), 0); }
  get netRevenue()     { return this.totalSales - this.totalReturns; }
  get invoiceCount()   { return this.filtered.length; }

  // Group by customer  
  get byCustomer() {
    const map: Record<string, number> = {};
    this.filtered.forEach(inv => {
      const c = inv.customerName || 'Unknown';
      map[c] = (map[c] || 0) + (inv.totalAmount || inv.grandTotal || 0);
    });
    return Object.entries(map).map(([label, amount]) => ({ label, amount })).sort((a,b) => b.amount - a.amount).slice(0, 8);
  }

  clear() { this.fromDate = ''; this.toDate = ''; this.filterCustomer = ''; this.filterStatus = ''; }
}