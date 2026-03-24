import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-finance-report',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './finance-report.component.html',
  styleUrls: ['./finance-report.component.css']
})
export class FinanceReportComponent {

  report:any = {
    account:'',
    fromDate:'',
    toDate:''
  }

  generateReport(){
    console.log("Finance Report", this.report);
  }

}