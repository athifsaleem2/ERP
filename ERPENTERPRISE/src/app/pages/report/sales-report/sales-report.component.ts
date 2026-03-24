import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sales-report',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.css']
})
export class SalesReportComponent {

  report:any = {
    fromDate:'',
    toDate:'',
    customer:'',
    status:'All'
  }

  generateReport(){
    console.log("Sales Report Filter", this.report);
  }

}