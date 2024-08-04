import { Component } from '@angular/core';
import { ProfileService, user } from '../profile.service';
import { LoaderService } from '../loader/loader.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  user1: user | null = null;

  constructor(
    private profileService: ProfileService,
    public loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.user1 = this.profileService.getUser();
  }
}
