import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { InventoryService, StockEntry } from '../../../core/services/inventory.service';

@Component({
  selector: 'app-stock-in-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './stock-in-list.component.html',
  styleUrls: ['./stock-in-list.component.css']
})
export class StockInListComponent implements OnInit {
  entries: StockEntry[] = [];
  isBrowser: boolean;

  constructor(
    private inventoryService: InventoryService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.loadEntries();
    }
  }

  loadEntries(): void {
    this.inventoryService.getRecentEntries().subscribe({
      next: (data: StockEntry[]) => this.entries = data.filter((e: StockEntry) => e.type === 'IN'),
      error: (err: any) => console.error('Error loading stock in entries:', err)
    });
  }

  navigateToAdd(): void {
    this.router.navigate(['/dashboard/stock-in']);
  }
}
