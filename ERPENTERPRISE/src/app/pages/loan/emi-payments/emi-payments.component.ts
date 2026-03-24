import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-emi-payments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './emi-payments.component.html',
  styleUrls: ['./emi-payments.component.css']
})
export class EmiPaymentsComponent {

  today: Date = new Date();

  savePayment() {
    alert('EMI Payment Saved');
  }

}