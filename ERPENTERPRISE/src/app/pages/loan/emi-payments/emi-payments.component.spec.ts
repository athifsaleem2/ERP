import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmiPaymentsComponent } from './emi-payments.component';

describe('EmiPaymentsComponent', () => {
  let component: EmiPaymentsComponent;
  let fixture: ComponentFixture<EmiPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmiPaymentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmiPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
