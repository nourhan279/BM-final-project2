// import { Component, ElementRef, ViewChild } from '@angular/core';
// import { ProfileService, user, TransferHistory } from '../profile.service';
// import { InactivityService } from '../inactivity.service';
// import { AuthService } from '../auth.service';
// import {
//   faChevronRight,
//   faBuildingColumns,
//   faArrowRightArrowLeft,
//   faCheck,
// } from '@fortawesome/free-solid-svg-icons';

// @Component({
//   selector: 'app-my-account',
//   templateUrl: './my-account.component.html',
//   styleUrls: ['./my-account.component.scss'],
// })
// export class MyAccountComponent {
//   user1: any;
//   showCopyMessage = false;
//   isDropdownVisible: boolean = false;
//   copiedAccountNumber: string | null = null;
//   lastName: string = '';
//   isPopupOpen: boolean = false;
//   faCheck = faCheck;

//   @ViewChild('profile') profileSection!: ElementRef;
//   @ViewChild('settings') settingsSection!: ElementRef;
//   @ViewChild('history') historySection!: ElementRef;
//   @ViewChild('change_password') changePasswordSection!: ElementRef;

//   constructor(
//     private profileService: ProfileService,
//     private inactivityService: InactivityService,
//     private authService: AuthService
//   ) {}

//   activeSection: string = 'profile';
//   phistory: TransferHistory[] = [
//     { recipientName: 'John Doe', amount: 1000, accountNumber: '1234567890' },
//     { recipientName: 'Jane Smith', amount: 500, accountNumber: '0987654321' },
//   ];

//   ngOnInit(): void {
//     this.authService.ggetUser().subscribe((data) => {
//       console.log(data);
//       this.user1 = data[0]; // Assuming the API returns an array with a single user object
//       this.extractLastName();
//     });
//   }

//   closePopup() {
//     this.isPopupOpen = false;
//   }
//   extractLastName(): void {
//     if (this.user1 && this.user1.username) {
//       const nameParts = this.user1.username.split(' ');
//       this.lastName =
//         nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';
//     }
//   }

//   ngAfterViewInit(): void {
//     if (!this.activeSection || this.activeSection === 'profile') {
//       this.scrollToSection(this.activeSection);
//     }
//   }

//   scrollToSection(section: string): void {
//     setTimeout(() => {
//       let element: ElementRef | undefined;
//       const headerOffset = 110;

//       switch (section) {
//         case 'profile':
//           element = this.profileSection;
//           break;
//         case 'settings':
//           element = this.settingsSection;
//           break;
//         case 'history':
//           element = this.historySection;
//           break;
//         case 'change_password':
//           element = this.changePasswordSection;
//           break;
//         default:
//           return;
//       }

//       if (element && element.nativeElement) {
//         const elementPosition =
//           element.nativeElement.getBoundingClientRect().top + window.scrollY;
//         const offsetPosition = elementPosition - headerOffset;

//         window.scrollTo({
//           top: offsetPosition,
//           behavior: 'smooth',
//         });
//       }
//     }, 100);
//   }

//   navigateTo(section: string): void {
//     this.activeSection = section;
//     this.scrollToSection(section);
//   }

//   open_section(section: string) {
//     this.activeSection = section;
//     this.scrollToSection(section);
//   }

//   copyToClipboard(accountNumber: string) {
//     const listener = (e: ClipboardEvent) => {
//       e.clipboardData?.setData('text/plain', accountNumber);
//       e.preventDefault();
//       document.removeEventListener('copy', listener);
//     };
//     document.addEventListener('copy', listener);
//     document.execCommand('copy');
//     this.copiedAccountNumber = accountNumber;
//     setTimeout(() => {
//       this.copiedAccountNumber = null;
//     }, 2000); // Hide the checkmark after 2 seconds
//   }

//   setSubSection(subSection: string) {
//     this.activeSection = subSection;
//     this.scrollToSection(subSection);
//   }

//   openChangePassword() {
//     this.activeSection = 'settings';
//     setTimeout(() => {
//       this.activeSection = 'change_password';
//       this.scrollToSection('change_password');
//     }, 0);
//   }

//   toggleDropdown(): void {
//     this.isDropdownVisible = !this.isDropdownVisible;
//   }

//   getUserInitials(): string {
//     if (this.user1) {
//       const { username } = this.user1;
//       if (username) {
//         const nameParts = username.split(' ');
//         const firstInitial = nameParts[0] ? nameParts[0][0] : '';
//         const lastInitial =
//           nameParts.length > 1 ? nameParts[nameParts.length - 1][0] : '';
//         return `${firstInitial}${lastInitial}`.toUpperCase();
//       }
//     }
//     return '';
//   }

//   ngOnDestroy(): void {
//     this.inactivityService.stopInactivityListener();
//   }

//   updateProfile() {
//     const updatedFields = {
//       username: this.user1.username,
//       email: this.user1.email,
//       phoneNumber: this.user1.phoneNumber,
//       gender: this.user1.gender,
//     };
//     this.isPopupOpen = true;

//     this.authService.updateUser(updatedFields).subscribe(
//       (response) => {
//         console.log('User updated successfully!', response);
//       },
//       (error) => {
//         console.error('Error updating user:', error);
//       }
//     );
//   }

//   currentPassword = '';
//   newPassword = '';
//   errorMessage = '';
//   confirmPassword = '';
//   successMessage = '';

//   updatePassword() {
//     this.authService.verifyCurrentPassword(this.currentPassword).subscribe(
//       (response) => {
//         if (true) {
//           this.authService
//             .updatePassword({
//               currentPassword: this.currentPassword,
//               newPassword: this.newPassword,
//             })
//             .subscribe(
//               (res) => {
//                 this.successMessage = 'Password updated successfully';
//                 this.errorMessage = '';
//                 this.isPopupOpen = true;
//               },
//               (error) => {
//                 this.errorMessage = 'Error updating password';
//                 this.successMessage = '';
//                 console.error(error);
//               }
//             );
//         } else {
//           this.errorMessage = 'Current password is incorrect';
//           this.successMessage = '';
//         }
//       },
//       (error) => {
//         this.errorMessage = 'Error verifying current password';
//         this.successMessage = '';
//         console.error(error);
//       }
//     );
//   }
// }
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ProfileService, TransferHistory } from '../profile.service';
import { InactivityService } from '../inactivity.service';
import { AuthService } from '../auth.service';
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
  user1: any;
  showCopyMessage = false;
  isDropdownVisible: boolean = false;
  copiedAccountNumber: string | null = null;
  lastName: string = '';
  isPopupOpen: boolean = false;
  faCheck = faCheck;

  @ViewChild('profile') profileSection!: ElementRef;
  @ViewChild('settings') settingsSection!: ElementRef;
  @ViewChild('history') historySection!: ElementRef;
  @ViewChild('change_password') changePasswordSection!: ElementRef;

  constructor(
    private profileService: ProfileService,
    private inactivityService: InactivityService,
    private authService: AuthService
  ) {}

  activeSection: string = 'profile';
  phistory: TransferHistory[] = [
    { recipientName: 'John Doe', amount: 1000, accountNumber: '1234567890' },
    { recipientName: 'Jane Smith', amount: 500, accountNumber: '0987654321' },
  ];

  ngOnInit(): void {
    this.authService.getUser().subscribe((data) => {
      console.log(data);
      this.user1 = data[0]; // Assuming the API returns an array with a single user object
      this.extractLastName();
    });
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
}
