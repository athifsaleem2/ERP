import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SettingsService, Role } from '../../../core/services/settings.service';

@Component({
  selector: 'app-add-role',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent implements OnInit {
  today = new Date();
  saving = false;
  successMsg = '';
  errorMsg = '';

  allModules = ['Dashboard', 'Sales', 'Purchase', 'Inventory', 'HRMS', 'Finance', 'Loans', 'Reports', 'Settings'];
  selectedModules: string[] = [];

  form: Role = {
    name: '',
    description: '',
    permissions: '',
    status: 'Active'
  };

  constructor(private settingsService: SettingsService, private router: Router) {}
  ngOnInit() {}

  toggleModule(mod: string) {
    const idx = this.selectedModules.indexOf(mod);
    if (idx === -1) this.selectedModules.push(mod);
    else this.selectedModules.splice(idx, 1);
    this.form.permissions = this.selectedModules.join(',');
  }

  isSelected(mod: string) { return this.selectedModules.includes(mod); }

  save() {
    if (!this.form.name) return;
    this.saving = true;
    this.settingsService.createRole(this.form).subscribe({
      next: () => {
        this.successMsg = 'Role created successfully!';
        this.saving = false;
        setTimeout(() => this.router.navigate(['/dashboard/roles-permissions']), 1500);
      },
      error: () => { this.errorMsg = 'Failed to create role.'; this.saving = false; }
    });
  }

  cancel() { this.router.navigate(['/dashboard/roles-permissions']); }
}
