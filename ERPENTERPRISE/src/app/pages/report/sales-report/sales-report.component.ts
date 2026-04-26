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
    let done = 0;
    const finish = () => { if (++done >= 3) this.loading = false; };

    this.salesService.getInvoices().subscribe({ next: d => { this.allInvoices = d; finish(); }, error: finish });
    this.returnService.getReturns().subscribe({ next: d => { this.allReturns = d; finish(); }, error: finish });
    this.customerService.getCustomers().subscribe({ next: d => { this.customers = d; finish(); }, error: finish });
  }

  get filtered() {
    return this.allInvoices.filter(inv => {
      const date = new Date(inv.invoiceDate || inv.dueDate || inv.date || inv.createdAt);
      const matchFrom = !this.fromDate || date >= new Date(this.fromDate);
      const matchTo   = !this.toDate   || date <= new Date(this.toDate);
      const matchCust = !this.filterCustomer || (inv.customerName || '').toLowerCase().includes(this.filterCustomer.toLowerCase());
      return matchFrom && matchTo && matchCust;
    });
  }

  get totalSales()   { return this.filtered.reduce((s, i) => s + (i.grandTotal || 0), 0); }
  get totalReturns() { return this.allReturns.reduce((s, r) => s + (r.totalAmount || r.grandTotal || 0), 0); }
  get netRevenue()   { return this.totalSales - this.totalReturns; }
  get invoiceCount() { return this.filtered.length; }

  get byCustomer() {
    const map: Record<string, number> = {};
    this.filtered.forEach(inv => {
      const c = inv.customerName || 'Unknown';
      map[c] = (map[c] || 0) + (inv.grandTotal || 0);
    });
    return Object.entries(map).map(([label, amount]) => ({ label, amount }))
      .sort((a, b) => b.amount - a.amount).slice(0, 8);
  }

  clear() { this.fromDate = ''; this.toDate = ''; this.filterCustomer = ''; }
}