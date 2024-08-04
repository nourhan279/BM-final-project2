import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { InactivityService } from './inactivity.service';
import { ProfileService } from './profile.service';
import { LogoutComponent } from './logout/logout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InactivityDialogComponent } from './inactivity-dialog/inactivity-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HomeComponent } from './home/home.component';
import { CountryDropdownComponent } from './country-dropdown/country-dropdown.component';
// import { AngularMaterialModule } from './angular-material/angular-material.module';
import { MatSelectModule } from '@angular/material/select';
import { HeaderMoneyTransferComponent } from './header-money-transfer/header-money-transfer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { MatProgressBarModule } from '@angular/material/progress-bar';
// import { LoaderComponent } from './loader/loader.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from './loader/loader.interceptor';

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
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatSelectModule,
    FontAwesomeModule,
    FormsModule,
    MatProgressBarModule,
  ],
  providers: [
    ProfileService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
}
