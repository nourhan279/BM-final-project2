import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { MyAccountComponent } from './my-account/my-account.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { HomeComponent } from './home/home.component';
import { HeaderMoneyTransferComponent } from './header-money-transfer/header-money-transfer.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'money-transfer', component: HeaderMoneyTransferComponent },
  { path: 'my-account', component: MyAccountComponent },
  { path: 'register', component: CreateAccountComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: '**', component: NotfoundComponent },
];

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
};
@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
