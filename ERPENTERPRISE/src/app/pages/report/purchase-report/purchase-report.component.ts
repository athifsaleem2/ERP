import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-purchase-report',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './purchase-report.component.html',
  styleUrls: ['./purchase-report.component.css']
})
export class PurchaseReportComponent {

  report:any = {
    fromDate:'',
    toDate:'',
    supplier:''
  }

  generateReport(){
    console.log("Purchase Report", this.report);
  }

}