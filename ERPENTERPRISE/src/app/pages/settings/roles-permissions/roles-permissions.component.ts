import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SettingsService, Role } from '../../../core/services/settings.service';

@Component({
  selector: 'app-roles-permissions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './roles-permissions.component.html',
  styleUrls: ['./roles-permissions.component.css']
})
export class RolesPermissionsComponent implements OnInit {
  today = new Date();
  roles: Role[] = [];
  loading = false;

  allModules = ['Dashboard', 'Sales', 'Purchase', 'Inventory', 'HRMS', 'Finance', 'Loans', 'Reports', 'Settings'];

  constructor(private settingsService: SettingsService, private router: Router) {}

  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.settingsService.getRoles().subscribe({
      next: d => { this.roles = d; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  getPermissions(role: Role): string[] {
    return role.permissions ? role.permissions.split(',').map(p => p.trim()).filter(p => p) : [];
  }

  addRole() { this.router.navigate(['/dashboard/add-role']); }

  delete(id: number | undefined) {
    if (!id || !confirm('Delete this role?')) return;
    this.settingsService.deleteRole(id).subscribe({ next: () => this.load() });
  }
}
