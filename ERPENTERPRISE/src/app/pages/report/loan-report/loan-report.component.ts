import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-loan-report',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './loan-report.component.html',
  styleUrls: ['./loan-report.component.css']
})
export class LoanReportComponent {

  report:any = {
    customer:'',
    status:'All',
    fromDate:''
  }

  generateReport(){
    console.log("Loan Report", this.report);
  }

}