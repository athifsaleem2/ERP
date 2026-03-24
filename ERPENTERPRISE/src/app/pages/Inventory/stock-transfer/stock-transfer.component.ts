import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-stock-transfer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stock-transfer.component.html',
  styleUrls: ['./stock-transfer.component.css']
})
export class StockTransferComponent {

  product = '';
  fromWarehouse = '';
  toWarehouse = '';
  quantity = 0;

  transferList: any[] = [];

  transferStock() {

    if (!this.product || this.quantity <= 0) return;

    this.transferList.push({
      product: this.product,
      from: this.fromWarehouse,
      to: this.toWarehouse,
      quantity: this.quantity
    });

    this.product = '';
    this.fromWarehouse = '';
    this.toWarehouse = '';
    this.quantity = 0;
  }
}