import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inventory-report',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './inventory-report.component.html',
  styleUrls: ['./inventory-report.component.css']
})
export class InventoryReportComponent {

  report:any = {
    product:'',
    category:'',
    stockStatus:'All'
  }

  generateReport(){
    console.log("Inventory Report", this.report);
  }

}