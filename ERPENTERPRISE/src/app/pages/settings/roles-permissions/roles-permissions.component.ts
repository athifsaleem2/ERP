import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-roles-permissions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './roles-permissions.component.html',
  styleUrls: ['./roles-permissions.component.css']
})
export class RolesPermissionsComponent {
  constructor(private router: Router) {}

  addRole() {
    this.router.navigate(['/dashboard/add-role']);
  }
}
