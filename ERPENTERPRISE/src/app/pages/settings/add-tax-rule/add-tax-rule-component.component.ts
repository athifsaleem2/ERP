import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-tax-rule',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-tax-rule-component.component.html',
  styleUrls: ['./add-tax-rule-component.component.css']
})
export class AddTaxRuleComponent implements OnInit {
  taxRuleForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.taxRuleForm = this.formBuilder.group({
      ruleName: ['', [Validators.required]],
      minSalary: ['', [Validators.required, Validators.min(0)]],
      maxSalary: ['', [Validators.required, Validators.min(0)]],
      taxPercentage: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      deductionType: ['', [Validators.required]],
      status: ['active', [Validators.required]]
    });
  }

  ngOnInit(): void { }

  get f() {
    return this.taxRuleForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.taxRuleForm.invalid) {
      return;
    }
    console.log('Tax Rule Created:', this.taxRuleForm.value);
    this.router.navigate(['/tax-settings']);
  }

  onCancel() {
    this.router.navigate(['/tax-settings']);
  }
}