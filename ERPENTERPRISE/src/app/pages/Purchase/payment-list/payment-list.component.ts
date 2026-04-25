import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { PaymentService, Payment } from '../../../core/services/payment.service';

@Component({
  selector: 'app-payment-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './payment-list.component.html',
  styleUrl: './payment-list.component.css'
})
export class PaymentListComponent implements OnInit {
  payments: Payment[] = [];
  isBrowser: boolean;

  constructor(
    private paymentService: PaymentService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.loadPayments();
    }
  }

  loadPayments(): void {
    this.paymentService.getPayments().subscribe({
      next: (data) => this.payments = data,
      error: (err) => console.error('Error loading payments:', err)
    });
  }

  navigateToAdd(): void {
    this.router.navigate(['/dashboard/payments']);
  }
}
