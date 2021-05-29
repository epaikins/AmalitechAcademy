import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './entry/login/login.component';
import { AdminComponent } from './entry/admin/admin.component';
import { UsersModule } from './modules/users/users.module';
import { StudentComponent } from './entry/student/student.component';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { UsersapiService } from "./shared/services/usersapi.service";
import { UserRoutingModule } from './modules/users/user-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    StudentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserRoutingModule,
    NgbModule,
    CommonModule,
    FontAwesomeModule,
    UsersModule,
    HttpClientModule
  ],
  providers: [UsersapiService],
  bootstrap: [AppComponent],
  schemas:[ CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
  }

