import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sales-return',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sales-return.component.html',
  styleUrls: ['./sales-return.component.css']
})
export class SalesReturnComponent {

  today: Date = new Date();

}