import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AuthService } from '../auth.service';
import { LoaderService } from '../loader/loader.service';
import { CreateAccountComponent } from './create-account.component';

describe('CreateAccountComponent', () => {
  let component: CreateAccountComponent;
  let fixture: ComponentFixture<CreateAccountComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthService', ['register']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [CreateAccountComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        LoaderService,
        { provide: AuthService, useValue: authSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.registrationForm).toBeDefined();
    expect(component.registrationForm.get('username')?.value).toBe('');
    expect(component.registrationForm.get('email')?.value).toBe('');
    expect(component.registrationForm.get('phoneNumber')?.value).toBe('');
    expect(component.registrationForm.get('country')?.value).toBe('EG');
  });

  it('should mark all fields as touched on initialization', () => {
    component.ngOnInit();
    Object.keys(component.registrationForm.controls).forEach((key) => {
      expect(component.registrationForm.get(key)?.touched).toBe(true);
    });
  });

  it('should not submit the form if it is invalid', () => {
    component.onSubmit();
    expect(authService.register).not.toHaveBeenCalled();
  });

  it('should submit the form and navigate to login on success', () => {
    component.registrationForm.setValue({
      username: 'validUsername',
      email: 'test@example.com',
      phoneNumber: '01234567890',
      country: 'EG',
      dateOfBirth: { day: '01', month: 'January', year: '2000' },
      gender: 'male',
      password: 'validPassword',
      confirmPassword: 'validPassword',
    });

    const mockResponse = { success: true };
    authService.register.and.returnValue(of(mockResponse));

    component.onSubmit();
    expect(authService.register).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  });

  it('should handle registration failure', () => {
    component.registrationForm.setValue({
      username: 'validUsername',
      email: 'test@example.com',
      phoneNumber: '01234567890',
      country: 'EG',
      dateOfBirth: { day: '01', month: 'January', year: '2000' },
      gender: 'male',
      password: 'validPassword',
      confirmPassword: 'validPassword',
    });

    authService.register.and.returnValue(
      throwError({ error: 'Registration failed' })
    );

    component.onSubmit();
    expect(authService.register).toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
