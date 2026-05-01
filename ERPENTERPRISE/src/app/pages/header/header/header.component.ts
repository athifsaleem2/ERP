import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Output() toggleSidebar = new EventEmitter<void>();

  companyName: string | null = 'ERP Enterprise';
  profilePicUrl: string | null = 'https://ui-avatars.com/api/?name=Admin&background=6366f1&color=fff';

}