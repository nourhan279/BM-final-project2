import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CountryDropdownComponent } from './country-dropdown.component';

describe('CountryDropdownComponent', () => {
  let component: CountryDropdownComponent;
  let fixture: ComponentFixture<CountryDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CountryDropdownComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    const form = component.currencyForm;
    expect(form.get('senderAmount')?.value).toBe(0);
    expect(form.get('senderCurrency')?.value).toBe('USD');
    expect(form.get('recipientAmount')?.value).toBe(0);
    expect(form.get('recipientCurrency')?.value).toBe('EUR');
  });

  it('should update recipient amount based on sender amount and conversion rate', () => {
    component.currencyForm.patchValue({
      senderAmount: 100,
      senderCurrency: 'USD',
      recipientCurrency: 'EGP',
    });
    component.updateRecipientAmount();

    const recipientAmount =
      component.currencyForm.get('recipientAmount')?.value;
    expect(recipientAmount).toBeCloseTo(4842.2); // 100 * 48.422
  });

  it('should return the correct conversion rate', () => {
    const conversionRate = component.getConversionRate('USD', 'EGP');
    expect(conversionRate).toBe(48.422);
  });

  it('should return 1 for invalid conversion rates', () => {
    const conversionRate = component.getConversionRate('USD', 'INVALID');
    expect(conversionRate).toBe(1);
  });

  it('should update recipient amount on form value changes', () => {
    spyOn(component, 'updateRecipientAmount');
    component.currencyForm.patchValue({ senderAmount: 50 });
    expect(component.updateRecipientAmount).toHaveBeenCalled();
  });

  it('should find the selected sender currency', () => {
    component.currencyForm.patchValue({ senderCurrency: 'EGP' });
    const selectedCurrency = component.selectedSenderCurrency;
    expect(selectedCurrency).toEqual({
      code: 'EGP',
      name: 'Egyptian Pound',
      flag: '/assets/egypt.svg',
    });
  });

  it('should find the selected recipient currency', () => {
    component.currencyForm.patchValue({ recipientCurrency: 'USD' });
    const selectedCurrency = component.selectedRecipientCurrency;
    expect(selectedCurrency).toEqual({
      code: 'USD',
      name: 'United States Dollar',
      flag: '/assets/united_states.svg',
    });
  });
});
