import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceService } from '../../../core/services/finance.service';
import { SalesInvoiceService } from '../../../core/services/sales-invoice.service';

@Component({
  selector: 'app-profit-loss',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profit-loss.component.html',
  styleUrls: ['./profit-loss.component.css']
})
export class ProfitLossComponent implements OnInit {
  today = new Date();
  loading = false;

  totalIncome = 0;
  totalExpenses = 0;

  incomeBreakdown: { label: string; amount: number }[] = [];
  expenseBreakdown: { label: string; amount: number }[] = [];

  constructor(
    private financeService: FinanceService,
    private salesInvoiceService: SalesInvoiceService
  ) {}

  ngOnInit() {
    this.loading = true;
    let done = 0;
    const tryFinish = () => { done++; if (done === 2) this.loading = false; };

    this.salesInvoiceService.getInvoices().subscribe({
      next: (invoices) => {
        this.totalIncome = invoices.reduce((s: number, inv: any) => s + (inv.totalAmount ?? inv.grandTotal ?? 0), 0);
        this.incomeBreakdown = [{ label: 'Sales Revenue', amount: this.totalIncome }];
        tryFinish();
      },
      error: () => tryFinish()
    });

    this.financeService.getExpenses().subscribe({
      next: (expenses) => {
        // Group by category
        const groups: Record<string, number> = {};
        expenses.forEach(e => {
          groups[e.category] = (groups[e.category] ?? 0) + e.amount;
        });
        this.expenseBreakdown = Object.entries(groups).map(([label, amount]) => ({ label, amount }));
        this.totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
        tryFinish();
      },
      error: () => tryFinish()
    });
  }

  get netProfit() { return this.totalIncome - this.totalExpenses; }
  get profitMargin() {
    return this.totalIncome > 0 ? ((this.netProfit / this.totalIncome) * 100).toFixed(1) : '0.0';
  }
  get isProfit() { return this.netProfit >= 0; }
}