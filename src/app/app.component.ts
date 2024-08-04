import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProfileService, user } from './profile.service';
import { InactivityService } from './inactivity.service';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
} from '@angular/router';
import { LoaderService } from './loader/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  user1: user | null = null;
  activeSection: string = 'profile';
  isLoadingSubscription: Subscription | undefined; // Store subscription for cleanup

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.user1 = this.profileService.getUser();
    this.setupRouterEvents();
  }

  ngOnDestroy(): void {
    if (this.isLoadingSubscription) {
      this.isLoadingSubscription.unsubscribe();
    }
  }

  onSectionChange(section: string) {
    this.activeSection = section;
  }

  private setupRouterEvents(): void {
    this.isLoadingSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loaderService.isloading.next(true);
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        // Optionally delay hiding loader for slower navigations
        setTimeout(() => this.loaderService.isloading.next(false), 400); // Adjust delay as needed
      }
    });
  }
}
