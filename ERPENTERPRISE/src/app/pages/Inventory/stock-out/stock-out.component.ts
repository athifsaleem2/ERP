import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-stock-out',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stock-out.component.html',
  styleUrls: ['./stock-out.component.css']
})
export class StockOutComponent {

  product = '';
  customer = '';
  quantity = 0;
  date = '';

  stockOutList: any[] = [];

  saveStockOut() {

    if (!this.product || this.quantity <= 0) return;

    this.stockOutList.push({
      product: this.product,
      customer: this.customer,
      quantity: this.quantity,
      date: this.date
    });

    this.product = '';
    this.customer = '';
    this.quantity = 0;
    this.date = '';
  }
}