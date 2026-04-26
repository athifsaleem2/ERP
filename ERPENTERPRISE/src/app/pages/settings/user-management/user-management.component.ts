import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SettingsService, AppUser } from '../../../core/services/settings.service';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  today = new Date();
  users: AppUser[] = [];
  loading = false;
  searchTerm = '';

  constructor(private settingsService: SettingsService, private router: Router) {}

  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.settingsService.getUsers().subscribe({
      next: d => { this.users = d; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  get filtered() {
    return this.users.filter(u =>
      !this.searchTerm ||
      (u.username || '').toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      (u.fullName || '').toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      (u.email || '').toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  get adminCount() { return this.users.filter(u => u.role === 'Admin').length; }

  roleColor(role: string | undefined) {
    const m: Record<string, string> = { Admin: 'danger', Manager: 'warning', Staff: 'info', User: 'secondary' };
    return m[role || ''] || 'secondary';
  }

  addUser() { this.router.navigate(['/dashboard/add-user']); }

  delete(id: number | undefined) {
    if (!id || !confirm('Delete this user?')) return;
    this.settingsService.deleteUser(id).subscribe({ next: () => this.load() });
  }
}
