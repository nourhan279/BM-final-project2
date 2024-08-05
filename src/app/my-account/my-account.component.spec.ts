import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MyAccountComponent } from './my-account.component';
import { AuthService } from '../auth.service';
import { ProfileService } from '../profile.service';
import { InactivityService } from '../inactivity.service';
import { of, throwError } from 'rxjs';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

describe('MyAccountComponent', () => {
  let component: MyAccountComponent;
  let fixture: ComponentFixture<MyAccountComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockProfileService: jasmine.SpyObj<ProfileService>;
  let mockInactivityService: jasmine.SpyObj<InactivityService>;

  beforeEach(async () => {
    // Create spy objects for services
    const authServiceSpy = jasmine.createSpyObj('AuthService', [
      'getUser',
      'getbalance',
      'updateUser',
      'updatePassword',
    ]);
    const profileServiceSpy = jasmine.createSpyObj('ProfileService', []);
    const inactivityServiceSpy = jasmine.createSpyObj('InactivityService', [
      'stopInactivityListener',
    ]);

    // Set up the test module
    await TestBed.configureTestingModule({
      declarations: [MyAccountComponent],
      imports: [FormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: ProfileService, useValue: profileServiceSpy },
        { provide: InactivityService, useValue: inactivityServiceSpy },
      ],
    }).compileComponents();

    // Initialize the component and services
    fixture = TestBed.createComponent(MyAccountComponent);
    component = fixture.componentInstance;
    mockAuthService = TestBed.inject(
      AuthService
    ) as jasmine.SpyObj<AuthService>;
    mockProfileService = TestBed.inject(
      ProfileService
    ) as jasmine.SpyObj<ProfileService>;
    mockInactivityService = TestBed.inject(
      InactivityService
    ) as jasmine.SpyObj<InactivityService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize user data on ngOnInit', () => {
    const userData = [
      {
        username: 'John Doe',
        email: 'john.doe@example.com',
        phoneNumber: '1234567890',
        gender: 'Male',
      },
    ];
    mockAuthService.getUser.and.returnValue(of(userData));

    fixture.detectChanges();

    expect(component.user1).toEqual(userData[0]);
  });

  it('should load balance successfully', () => {
    const balanceData = { balance: 1000 };
    mockAuthService.getbalance.and.returnValue(of(balanceData));

    component.loadBalance();

    expect(component.balance).toBe(1000);
  });

  it('should handle error when loading balance', () => {
    mockAuthService.getbalance.and.returnValue(
      throwError('Error fetching balance')
    );

    component.loadBalance();

    expect(component.balance).toBe(0);
  });

  it('should toggle dropdown visibility', () => {
    expect(component.isDropdownVisible).toBeFalse();
    component.toggleDropdown();
    expect(component.isDropdownVisible).toBeTrue();
    component.toggleDropdown();
    expect(component.isDropdownVisible).toBeFalse();
  });

  it('should copy account number to clipboard and show copied status', () => {
    const accountNumber = '1234567890';
    component.copyToClipboard(accountNumber);

    expect(component.copiedAccountNumber).toBe(accountNumber);
    setTimeout(() => {
      expect(component.copiedAccountNumber).toBeNull();
    }, 2000);
  });

  it('should update profile and show success popup', () => {
    spyOn(component, 'updateProfile').and.callThrough();
    const updatedFields = {
      username: 'John Doe',
      email: 'john.doe@example.com',
      phoneNumber: '1234567890',
      gender: 'Male',
    };
    mockAuthService.updateUser.and.returnValue(of({ success: true }));

    component.updateProfile();

    expect(component.isPopupOpen).toBeTrue();
    expect(component.updateProfile).toHaveBeenCalled();
  });

  it('should update password and show success popup', () => {
    spyOn(component, 'updatePassword').and.callThrough();
    const newPasswordData = {
      currentPassword: 'oldpassword',
      newPassword: 'newpassword',
    };
    mockAuthService.updatePassword.and.returnValue(of({ success: true }));

    component.updatePassword();

    expect(component.successMessage).toBe('Password updated successfully');
    expect(component.isPopupOpen).toBeTrue();
    expect(component.updatePassword).toHaveBeenCalled();
  });

  it('should handle error while updating password', () => {
    mockAuthService.updatePassword.and.returnValue(
      throwError('Error updating password')
    );

    component.updatePassword();

    expect(component.errorMessage).toBe('Error updating password');
    expect(component.successMessage).toBe('');
  });

  afterEach(() => {
    component.ngOnDestroy();
  });
});
