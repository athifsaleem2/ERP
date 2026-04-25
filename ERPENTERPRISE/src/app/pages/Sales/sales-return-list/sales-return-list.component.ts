import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SalesReturnService, SalesReturn } from '../../../core/services/sales-return.service';

@Component({
  selector: 'app-sales-return-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sales-return-list.component.html',
  styleUrl: './sales-return-list.component.css'
})
export class SalesReturnListComponent implements OnInit {
  returns: SalesReturn[] = [];
  isBrowser: boolean;

  constructor(
    private salesReturnService: SalesReturnService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.loadReturns();
    }
  }

  loadReturns(): void {
    this.salesReturnService.getReturns().subscribe({
      next: (data) => this.returns = data,
      error: (err) => console.error('Error loading sales returns:', err)
    });
  }

  navigateToAdd(): void {
    this.router.navigate(['/dashboard/sales-return']);
  }
}
