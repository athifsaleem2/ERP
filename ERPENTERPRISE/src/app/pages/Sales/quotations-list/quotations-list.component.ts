import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { QuotationService, Quotation } from '../../../core/services/quotation.service';

@Component({
  selector: 'app-quotations-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './quotations-list.component.html',
  styleUrl: './quotations-list.component.css'
})
export class QuotationsListComponent implements OnInit {
  quotations: Quotation[] = [];
  isBrowser: boolean;

  constructor(
    private quotationService: QuotationService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.loadQuotations();
    }
  }

  loadQuotations(): void {
    this.quotationService.getQuotations().subscribe({
      next: (data) => this.quotations = data,
      error: (err) => console.error('Error loading quotations:', err)
    });
  }

  navigateToAdd(): void {
    this.router.navigate(['/dashboard/quotations']);
  }
}
