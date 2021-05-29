import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentComponent } from './department/department.component';
import { UsergroupComponent } from './usergroup/usergroup.component';
import { UserComponent } from './user/user.component';
import { UsersoverviewComponent} from './usersoverview/usersoverview.component';
import { AdminComponent } from '../../entry/admin/admin.component';


const routes: Routes = [
    {path: "admin", component:AdminComponent, children:[
        {path:'usersoverview', component: UsersoverviewComponent, children:[
          {path:'departments', component: DepartmentComponent},
          {path:'usergroups', component: UsergroupComponent},
          {path:'users', component: UserComponent}
        ]},
      ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }