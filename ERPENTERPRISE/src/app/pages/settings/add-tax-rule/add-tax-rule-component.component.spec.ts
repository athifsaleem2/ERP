import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaxRuleComponentComponent } from './add-tax-rule-component.component';

describe('AddTaxRuleComponentComponent', () => {
  let component: AddTaxRuleComponentComponent;
  let fixture: ComponentFixture<AddTaxRuleComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTaxRuleComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTaxRuleComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
