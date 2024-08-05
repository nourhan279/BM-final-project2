import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { InactivityDialogComponent } from './inactivity-dialog/inactivity-dialog.component';
import { HomeComponent } from './home/home.component';
import { CountryDropdownComponent } from './country-dropdown/country-dropdown.component';
import { HeaderMoneyTransferComponent } from './header-money-transfer/header-money-transfer.component';

import { InactivityService } from './inactivity.service';
import { ProfileService } from './profile.service';
import { LoaderInterceptor } from './loader/loader.interceptor';
import { AuthorInterceptor } from './author.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    MyAccountComponent,
    FooterComponent,
    NavbarComponent,
    NotfoundComponent,
    CreateAccountComponent,
    LoginComponent,
    LogoutComponent,
    InactivityDialogComponent,
    HomeComponent,
    CountryDropdownComponent,
    HeaderMoneyTransferComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatSelectModule,
    FontAwesomeModule,
    MatProgressBarModule,
  ],
  providers: [
    ProfileService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
}
