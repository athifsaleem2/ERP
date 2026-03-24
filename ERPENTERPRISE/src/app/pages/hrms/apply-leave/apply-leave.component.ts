import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-apply-leave',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.css']
})
export class ApplyLeaveComponent {

  applyLeave() {
    alert("Leave Request Submitted");
  }

}