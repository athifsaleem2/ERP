import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SettingsService, TaxRule } from '../../../core/services/settings.service';

@Component({
  selector: 'app-add-tax-rule',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-tax-rule-component.component.html',
  styleUrls: ['./add-tax-rule-component.component.css']
})
export class AddTaxRuleComponent implements OnInit {
  today = new Date();
  saving = false;
  successMsg = '';
  errorMsg = '';

  taxTypes   = ['Percentage', 'Fixed'];
  appliesTo  = ['All', 'Sales', 'Purchase', 'Payroll'];

  form: TaxRule = {
    ruleName: '',
    taxType: 'Percentage',
    taxPercentage: 0,
    minSalary: undefined,
    maxSalary: undefined,
    appliesTo: 'All',
    status: 'Active'
  };

  constructor(private settingsService: SettingsService, private router: Router) {}
  ngOnInit() {}

  save() {
    if (!this.form.ruleName) return;
    this.saving = true;
    this.settingsService.createTaxRule(this.form).subscribe({
      next: () => {
        this.successMsg = 'Tax rule created!';
        this.saving = false;
        setTimeout(() => this.router.navigate(['/dashboard/tax-settings']), 1500);
      },
      error: () => { this.errorMsg = 'Failed to save tax rule.'; this.saving = false; }
    });
  }

  cancel() { this.router.navigate(['/dashboard/tax-settings']); }
}