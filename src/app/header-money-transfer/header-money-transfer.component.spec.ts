import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMoneyTransferComponent } from './header-money-transfer.component';

describe('HeaderMoneyTransferComponent', () => {
  let component: HeaderMoneyTransferComponent;
  let fixture: ComponentFixture<HeaderMoneyTransferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderMoneyTransferComponent]
    });
    fixture = TestBed.createComponent(HeaderMoneyTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
