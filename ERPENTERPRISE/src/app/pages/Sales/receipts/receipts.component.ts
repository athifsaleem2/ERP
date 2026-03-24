import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-receipts',
  standalone: true,
  imports: [CommonModule],   // ✅ Needed for date pipe
  templateUrl: './receipts.component.html',
  styleUrl: './receipts.component.css'
})
export class ReceiptsComponent {

  today: Date = new Date();   // ✅ Declare today property

}