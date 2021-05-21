import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from '../app/entry/admin/admin.component';
import { LoginComponent } from '../app/entry/login/login.component';
import { StudentComponent } from '../app/entry/student/student.component';

import { UsersoverviewComponent } from '../app/modules/users/usersoverview/usersoverview.component';
import { DepartmentComponent } from '../app/modules/users/department/department.component';
import { UsergroupComponent } from '../app/modules/users/usergroup/usergroup.component';

const routes:Routes = [
  {path: "admin", component:AdminComponent, children:[
    {path:'usersoverview', component: UsersoverviewComponent},
    {path:'departments', component: DepartmentComponent},
    {path:'usergroups', component: UsergroupComponent}
  ]},
  {path: "login", component:LoginComponent},
  {path: "student", component:StudentComponent}
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
