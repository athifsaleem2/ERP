import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SettingsService, TaxRule } from '../../../core/services/settings.service';

@Component({
  selector: 'app-tax-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tax-settings.component.html',
  styleUrls: ['./tax-settings.component.css']
})
export class TaxSettingsComponent implements OnInit {
  today = new Date();
  taxRules: TaxRule[] = [];
  loading = false;

  constructor(private settingsService: SettingsService, private router: Router) {}

  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.settingsService.getTaxRules().subscribe({
      next: d => { this.taxRules = d; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  get activeCount() { return this.taxRules.filter(t => t.status === 'Active').length; }

  statusColor(s: string) { return s === 'Active' ? 'success' : 'secondary'; }

  openAddTaxRule() { this.router.navigate(['/dashboard/add-tax-rule']); }

  delete(id: number | undefined) {
    if (!id || !confirm('Delete this tax rule?')) return;
    this.settingsService.deleteTaxRule(id).subscribe({ next: () => this.load() });
  }
}
