import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SettingsService, CompanySetting } from '../../../core/services/settings.service';

@Component({
  selector: 'app-company-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './company-settings.component.html',
  styleUrls: ['./company-settings.component.css']
})
export class CompanySettingsComponent implements OnInit {
  today = new Date();
  loading = false;
  saving = false;
  successMsg = '';
  errorMsg = '';

  currencies = [
    { code: 'INR', symbol: '₹' }, { code: 'USD', symbol: '$' },
    { code: 'EUR', symbol: '€' }, { code: 'GBP', symbol: '£' },
    { code: 'AED', symbol: 'AED' }
  ];
  dateFormats = ['dd-MM-yyyy', 'MM/dd/yyyy', 'yyyy-MM-dd', 'dd/MM/yyyy'];

  form: CompanySetting = {
    companyName: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    taxNumber: '',
    currency: 'INR',
    currencySymbol: '₹',
    dateFormat: 'dd-MM-yyyy',
    logoUrl: ''
  };

  constructor(private settingsService: SettingsService) {}

  ngOnInit() {
    this.loading = true;
    this.settingsService.getCompanySettings().subscribe({
      next: d => { if (d && d.companyName) Object.assign(this.form, d); this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  onCurrencyChange() {
    const cur = this.currencies.find(c => c.code === this.form.currency);
    if (cur) this.form.currencySymbol = cur.symbol;
  }

  save() {
    if (!this.form.companyName) return;
    this.saving = true;
    this.settingsService.saveCompanySettings(this.form).subscribe({
      next: () => { this.successMsg = 'Company settings saved!'; this.saving = false; },
      error: () => { this.errorMsg = 'Failed to save settings.'; this.saving = false; }
    });
  }
}
