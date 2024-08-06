import {
  Component,
  ElementRef,
  Renderer2,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { ProfileService, user } from '../profile.service';
import {
  faChevronRight,
  faBuildingColumns,
  faArrowRightArrowLeft,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { InactivityService } from '../inactivity.service';
import { MatDialog } from '@angular/material/dialog';
import { Subscription, timer } from 'rxjs';
import { Router } from '@angular/router';
import { InactivityDialogComponent } from '../inactivity-dialog/inactivity-dialog.component';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header-money-transfer',
  templateUrl: './header-money-transfer.component.html',
  styleUrls: ['./header-money-transfer.component.scss'],
})
export class HeaderMoneyTransferComponent implements OnInit, OnDestroy {
  user1: any = {
    username: '',
    phoneNumber: '',
    email: '',
    gender: '',
    country: '',
    dateOfBirth: '',
    accounts: [],
  };
  isDropdownVisible: boolean = false;
  faStar = faStar;
  faChevronRight = faChevronRight;
  faArrowRightArrowLeft = faArrowRightArrowLeft;
  faBuildingColumns = faBuildingColumns;
  faCheck = faCheck;
  currentStep = 1;
  sendAmount: number = 0;
  receiveAmount: number = 0;
  sendCurrency: string = 'USD';
  receiveCurrency: string = 'EGP';
  recipientName: string = '';
  recipientAccount: string = '';
  flagUrl: string = '../../assets/Flag_of_Egypt.png';
  conversionRates: { [key: string]: number } = {
    USD_EGP: 48.422,
    USD_INR: 74.85,
    USD_CAD: 1.27,
    EUR_EGP: 56.78,
    EUR_INR: 87.23,
    EUR_CAD: 1.48,
    GBP_EGP: 65.42,
    GBP_INR: 102.35,
    GBP_CAD: 1.67,
  };

  isPopupOpen = false;

  private inactivityTimerSubscription!: Subscription;
  private readonly INACTIVITY_TIMEOUT = 300000; // 5 minutes in milliseconds
  private lastActivityTime: number = Date.now();

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private profileService: ProfileService,
    private inactivityService: InactivityService,
    private dialog: MatDialog,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.user1 = this.profileService.getUser();
    this.startInactivityListener();
    this.authService.getUser().subscribe((data) => {
      this.user1 = data;
    });
  }

  ngOnDestroy(): void {
    if (this.inactivityTimerSubscription) {
      this.inactivityTimerSubscription.unsubscribe();
    }
    document.removeEventListener('mousemove', this.resetInactivityTimer);
  }

  startInactivityListener(): void {
    document.addEventListener(
      'mousemove',
      this.resetInactivityTimer.bind(this)
    );

    this.inactivityTimerSubscription = timer(0, 1000).subscribe(() => {
      if (Date.now() - this.lastActivityTime > this.INACTIVITY_TIMEOUT) {
        this.openInactivityDialog();
      }
    });
  }

  resetInactivityTimer(): void {
    this.lastActivityTime = Date.now();
  }

  openInactivityDialog(): void {
    this.inactivityTimerSubscription.unsubscribe();
    const dialogRef = this.dialog.open(InactivityDialogComponent, {
      width: '400px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/logout']);
    });
  }

  scrollToBottom(): void {
    const element = document.getElementById('bottom-of-page');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  goToNextStep() {
    if (this.sendAmount > 0 && this.currentStep < 3) {
      this.currentStep++;
    }
  }

  goToPreviousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
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
  resetSteps() {
    this.currentStep = 1;
  }

  openPopup() {
    this.isPopupOpen = true;
  }

  closePopup() {
    this.isPopupOpen = false;
  }

  convertCurrency() {
    const rateKey = `${this.sendCurrency}_${this.receiveCurrency}`;
    const conversionRate = this.conversionRates[rateKey];

    if (conversionRate) {
      this.receiveAmount = this.sendAmount * conversionRate;
    } else {
      this.receiveAmount = 0;
    }
  }

  updateFlag(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const flagUrl = selectedOption.getAttribute('data-flag-url');
    const customSelect = this.el.nativeElement.querySelector('.custom-select');

    if (flagUrl && customSelect) {
      this.renderer.setStyle(
        customSelect,
        '--select-flag-url',
        `url(${flagUrl})`
      );
    }
  }

  updateFlagImage() {
    const selectElement = document.getElementById(
      'sendCurrency'
    ) as HTMLSelectElement;
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    this.flagUrl = selectedOption.getAttribute('data-flag-url') || '';
  }

  toggleDropdown(): void {
    this.isDropdownVisible = !this.isDropdownVisible;
  }
}
