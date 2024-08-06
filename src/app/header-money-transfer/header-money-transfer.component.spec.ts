import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HeaderMoneyTransferComponent } from './header-money-transfer.component';

describe('HeaderMoneyTransferComponent', () => {
  let component: HeaderMoneyTransferComponent;
  let fixture: ComponentFixture<HeaderMoneyTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderMoneyTransferComponent],
      imports: [FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderMoneyTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go to next step when goToNextStep is called', () => {
    component.currentStep = 1;
    component.goToNextStep();
    expect(component.currentStep).toBe(2);
  });

  it('should go to previous step when goToPreviousStep is called', () => {
    component.currentStep = 2;
    component.goToPreviousStep();
    expect(component.currentStep).toBe(1);
  });

  it('should convert currency when sendAmount changes', () => {
    component.sendAmount = 100;
    component.convertCurrency();
    expect(component.receiveAmount).toBeGreaterThan(0);
  });
});
