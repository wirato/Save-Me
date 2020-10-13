import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SideNavComponent } from './side-nav/side-nav.component';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

import { StockHomeComponent } from './stock/stock-home/stock-home.component';

import { AngularFireModule } from '@angular/fire'; // wirato
import { AngularFireStorageModule } from '@angular/fire/storage'; // wirato
import { AngularFirestoreModule } from '@angular/fire/firestore'; // wirato
import { environment } from '../environments/environment'; // wirato
import { AngularFireAuthModule } from "@angular/fire/auth";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { AuthService } from "./shared/services/auth.service";
import { StorageComponent } from './storage/storage.component';
import { FilesharedComponent } from './fileshared/fileshared.component';
import { StoragesharedComponent } from './storageshared/storageshared.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideNavComponent,
    StockHomeComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    StorageComponent,
    FilesharedComponent,
    StoragesharedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), // wirato
    AngularFireStorageModule, // wirato
    AngularFirestoreModule, // wirato
    AngularFireAuthModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
