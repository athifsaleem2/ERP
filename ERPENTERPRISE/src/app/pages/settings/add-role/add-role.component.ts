import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-role',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent {
  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/dashboard/roles-permissions']);
  }
}
