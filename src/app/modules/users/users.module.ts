import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { DepartmentComponent } from './department/department.component';
import { UsergroupComponent } from './usergroup/usergroup.component';
import { UsersoverviewComponent } from './usersoverview/usersoverview.component';

import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UserComponent,
    DepartmentComponent,
    UsergroupComponent,
    UsersoverviewComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class UsersModule { }
