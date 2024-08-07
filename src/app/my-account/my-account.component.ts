import { Component, ElementRef, ViewChild } from '@angular/core';
import { ProfileService, TransferHistory } from '../profile.service';
import { InactivityService } from '../inactivity.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import {
  faChevronRight,
  faBuildingColumns,
  faArrowRightArrowLeft,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss'],
})
export class MyAccountComponent {
  user1: any = {
    username: '',
    phoneNumber: '',
    email: '',
    gender: '',
    country: '',
    dateOfBirth: '',
    accounts: [],
  };

  showCopyMessage = false;
  isDropdownVisible: boolean = false;
  copiedAccountNumber: string | null = null;
  lastName: string = '';
  isPopupOpen: boolean = false;
  faCheck = faCheck;
  balance: string = '';
  historytrans: any;

  @ViewChild('profile') profileSection!: ElementRef;
  @ViewChild('settings') settingsSection!: ElementRef;
  @ViewChild('history') historySection!: ElementRef;
  @ViewChild('change_password') changePasswordSection!: ElementRef;

  constructor(
    private profileService: ProfileService,
    private inactivityService: InactivityService,
    private authService: AuthService,
    private router: Router
  ) {}

  activeSection: string = 'profile';
  phistory: TransferHistory[] = [
    { recipientName: 'John Doe', amount: 1000, accountNumber: '1234567890' },
    { recipientName: 'Jane Smith', amount: 500, accountNumber: '0987654321' },
  ];

  ngOnInit(): void {
    this.authService.getUser().subscribe((data) => {
      this.user1 = data;

      this.extractLastName();
    });
    this.loadBalance();
    this.loadHistory();
  }

  loadHistory() {
    this.authService.gethistory().subscribe(
      (arr) => {
        this.historytrans = arr;
        console.log(this.historytrans);
      },
      (error) => {
        console.error('Error fetching transaction history:', error);
      }
    );
  }

  loadBalance(): void {
    this.authService.getbalance().subscribe(
      (response) => {
        this.balance = response;
      },
      (error) => {
        console.error('Error fetching balance:', error);
      }
    );
  }

  closePopup() {
    this.isPopupOpen = false;
  }

  extractLastName(): void {
    if (this.user1 && this.user1.username) {
      const nameParts = this.user1.username.split(' ');
      this.lastName =
        nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';
    }
  }

  ngAfterViewInit(): void {
    if (!this.activeSection || this.activeSection === 'profile') {
      this.scrollToSection(this.activeSection);
    }
  }

  scrollToSection(section: string): void {
    setTimeout(() => {
      let element: ElementRef | undefined;
      const headerOffset = 110;

      switch (section) {
        case 'profile':
          element = this.profileSection;
          break;
        case 'settings':
          element = this.settingsSection;
          break;
        case 'history':
          element = this.historySection;
          break;
        case 'change_password':
          element = this.changePasswordSection;
          break;
        default:
          return;
      }

      if (element && element.nativeElement) {
        const elementPosition =
          element.nativeElement.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }, 100);
  }

  navigateTo(section: string): void {
    this.activeSection = section;
    this.scrollToSection(section);
  }

  open_section(section: string) {
    this.activeSection = section;
    this.scrollToSection(section);
  }

  copyToClipboard(accountNumber: string) {
    const listener = (e: ClipboardEvent) => {
      e.clipboardData?.setData('text/plain', accountNumber);
      e.preventDefault();
      document.removeEventListener('copy', listener);
    };
    document.addEventListener('copy', listener);
    document.execCommand('copy');
    this.copiedAccountNumber = accountNumber;
    setTimeout(() => {
      this.copiedAccountNumber = null;
    }, 2000); // Hide the checkmark after 2 seconds
  }

  setSubSection(subSection: string) {
    this.activeSection = subSection;
    this.scrollToSection(subSection);
  }

  openChangePassword() {
    this.activeSection = 'settings';
    setTimeout(() => {
      this.activeSection = 'change_password';
      this.scrollToSection('change_password');
    }, 0);
  }

  toggleDropdown(): void {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  getUserInitials(): string {
    if (this.user1) {
      const { username } = this.user1;
      if (username) {
        const nameParts = username.split(' ');
        const firstInitial = nameParts[0] ? nameParts[0][0] : '';
        const lastInitial =
          nameParts.length > 1 ? nameParts[nameParts.length - 1][0] : '';
        return `${firstInitial}${lastInitial}`.toUpperCase();
      }
    }
    return '';
  }

  ngOnDestroy(): void {
    this.inactivityService.stopInactivityListener();
  }

  updateProfile() {
    const updatedFields = {
      username: this.user1.username,
      email: this.user1.email,
      phoneNumber: this.user1.phoneNumber,
      gender: this.user1.gender,
    };
    this.isPopupOpen = true;

    this.authService.updateUser(updatedFields).subscribe(
      (response) => {
        console.log('User updated successfully!', response);
      },
      (error) => {
        console.error('Error updating user:', error);
      }
    );
  }

  currentPassword = '';
  newPassword = '';
  errorMessage = '';
  confirmPassword = '';
  successMessage = '';

  updatePassword() {
    this.authService
      .updatePassword({
        currentPassword: this.currentPassword,
        newPassword: this.newPassword,
      })
      .subscribe(
        (response) => {
          this.successMessage = 'Password updated successfully';
          this.errorMessage = '';
          this.isPopupOpen = true;
        },
        (error) => {
          this.errorMessage = 'Error updating password';
          this.successMessage = '';
          console.error(error);
        }
      );
  }
  logout() {
    this.authService.logout().subscribe({
      next: () => {
        console.log('Logout successful');
        localStorage.removeItem('authToken'); // Remove token from local storage
        this.router.navigate(['/login']); // Navigate to the login page
      },
      error: (error) => {
        console.error('Logout failed', error);
      },
    });
  }
}
