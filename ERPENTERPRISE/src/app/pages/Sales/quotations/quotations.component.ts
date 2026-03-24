import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-quotations',
    standalone: true,
  imports: [CommonModule], 
  templateUrl: './quotations.component.html',
  styleUrl: './quotations.component.css'
})
export class QuotationsComponent {
  today: Date = new Date(); 
}
