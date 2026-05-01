import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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
  
  isEditMode = false;
  userId?: number;

  form: AppUser = {
    username: '',
    password: '',
    email: '',
    fullName: '',
    role: 'User'
  };

  constructor(
    private settingsService: SettingsService, 
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.userId = +idParam;
      this.settingsService.getUser(this.userId).subscribe({
        next: (user) => {
          this.form = user;
          // Don't show hashed password or leave it blank for security
          this.form.password = ''; 
        },
        error: (err) => {
          this.errorMsg = 'Failed to load user data.';
        }
      });
    }
  }

  save() {
    if (!this.form.username) return;
    // Password might be optional on edit
    if (!this.isEditMode && !this.form.password) return;

    this.saving = true;
    
    if (this.isEditMode && this.userId) {
      this.settingsService.updateUser(this.userId, this.form).subscribe({
        next: () => {
          this.successMsg = 'User updated successfully!';
          this.saving = false;
          setTimeout(() => this.router.navigate(['/dashboard/user-management']), 1500);
        },
        error: (err) => { this.errorMsg = err?.error?.message || 'Failed to update user.'; this.saving = false; }
      });
    } else {
      this.settingsService.createUser(this.form).subscribe({
        next: () => {
          this.successMsg = 'User created successfully!';
          this.saving = false;
          setTimeout(() => this.router.navigate(['/dashboard/user-management']), 1500);
        },
        error: (err) => { this.errorMsg = err?.error?.message || 'Failed to create user.'; this.saving = false; }
      });
    }
  }

  cancel() { this.router.navigate(['/dashboard/user-management']); }
}
