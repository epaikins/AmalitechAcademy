import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { DepartmentComponent } from './department/department.component';
import { UsergroupComponent } from './usergroup/usergroup.component';



@NgModule({
  declarations: [
    UserComponent,
    DepartmentComponent,
    UsergroupComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UsersModule { }
