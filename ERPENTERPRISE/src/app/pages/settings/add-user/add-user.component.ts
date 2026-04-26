import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SettingsService, AppUser } from '../../../core/services/settings.service';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  today = new Date();
  saving = false;
  successMsg = '';
  errorMsg = '';
  roles: string[] = ['Admin', 'Manager', 'Staff', 'User', 'Accountant', 'HR'];

  form: AppUser = {
    username: '',
    password: '',
    email: '',
    fullName: '',
    role: 'User'
  };

  constructor(private settingsService: SettingsService, private router: Router) {}
  ngOnInit() {}

  save() {
    if (!this.form.username || !this.form.password) return;
    this.saving = true;
    this.settingsService.createUser(this.form).subscribe({
      next: () => {
        this.successMsg = 'User created successfully!';
        this.saving = false;
        setTimeout(() => this.router.navigate(['/dashboard/user-management']), 1500);
      },
      error: (err) => { this.errorMsg = err?.error?.message || 'Failed to create user.'; this.saving = false; }
    });
  }

  cancel() { this.router.navigate(['/dashboard/user-management']); }
}
