import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';   // ✅ KEEP THIS
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],  // ✅ ADD CommonModule HERE
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  @Input() isOpen: boolean = true;

  openMenu: string | null = null;

  toggleMenu(menu: string) {
    this.openMenu = this.openMenu === menu ? null : menu;
  }
  
}