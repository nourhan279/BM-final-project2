import { Component, ElementRef, ViewChild } from '@angular/core';
import { ProfileService, user, TransferHistory } from '../profile.service';
import { InactivityService } from '../inactivity.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss'],
})
export class MyAccountComponent {
  user1: user | null = null;
  showCopyMessage = false;
  isDropdownVisible: boolean = false;
  copiedAccountNumber: string | null = null;

  @ViewChild('profile') profileSection!: ElementRef;
  @ViewChild('settings') settingsSection!: ElementRef;
  @ViewChild('history') historySection!: ElementRef;
  @ViewChild('change_password') changePasswordSection!: ElementRef;

  constructor(
    private profileService: ProfileService,
    private inactivityService: InactivityService
  ) {}

  activeSection: string = 'profile';
  phistory: TransferHistory[] = [
    { recipientName: 'John Doe', amount: 1000, accountNumber: '1234567890' },
    { recipientName: 'Jane Smith', amount: 500, accountNumber: '0987654321' },
  ];

  ngOnInit(): void {
    this.user1 = this.profileService.getUser();
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
      const { fname, lname } = this.user1;
      const firstInitial = fname ? fname[0] : '';
      const lastInitial = lname ? lname[0] : '';
      return `${firstInitial}${lastInitial}`.toUpperCase();
    }
    return '';
  }

  ngOnDestroy(): void {
    this.inactivityService.stopInactivityListener();
  }
}
