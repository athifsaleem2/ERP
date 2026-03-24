import { Component } from '@angular/core';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {

  employee:any = {
    empId:'',
    name:'',
    department:'',
    designation:'',
    salary:'',
    joiningDate:''
  }

  saveEmployee(){
    console.log("Employee Saved",this.employee);
  }

  clearForm(){
    this.employee = {};
  }

}