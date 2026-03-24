import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tax-settings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tax-settings.component.html',
  styleUrls: ['./tax-settings.component.css']
})
export class TaxSettingsComponent {
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  openAddTaxRule() {
    this.router.navigate(['/dashboard/add-tax-rule']);
  }
}
