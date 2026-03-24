import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-stock-in',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stock-in.component.html',
  styleUrls: ['./stock-in.component.css']
})
export class StockInComponent {

  product = '';
  supplier = '';
  quantity = 0;
  date = '';

  stockInList: any[] = [];

  saveStockIn() {

    if (!this.product || this.quantity <= 0) return;

    this.stockInList.push({
      product: this.product,
      supplier: this.supplier,
      quantity: this.quantity,
      date: this.date
    });

    this.product = '';
    this.supplier = '';
    this.quantity = 0;
    this.date = '';
  }
}