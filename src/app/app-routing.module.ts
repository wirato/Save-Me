import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StockHomeComponent } from './stock/stock-home/stock-home.component';

import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AuthGuard } from "./shared/guard/auth.guard";
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { AppComponent } from './app.component';
import { StorageComponent } from './storage/storage.component';
import { FilesharedComponent } from './fileshared/fileshared.component';



const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full'},
  { path: 'shared', component:FilesharedComponent,canActivate:[AuthGuard]},
  { path: 'sign-in', component: SignInComponent},
  { path: 'register-user', component: SignUpComponent},
  { path: 'dashboard', component: StockHomeComponent, canActivate: [AuthGuard] },
  { path: 'setting', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
