import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stock-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stock-report.component.html',
  styleUrls: ['./stock-report.component.css']
})
export class StockReportComponent {

  stockData = [
    { product: 'Laptop', category: 'Electronics', totalIn: 50, totalOut: 20 },
    { product: 'Mobile', category: 'Electronics', totalIn: 100, totalOut: 40 },
      { product: 'Chair', category: 'Furniture', totalIn: 40, totalOut: 40 }

  ];

  getAvailableStock(item: any) {
    return item.totalIn - item.totalOut;
  }
}