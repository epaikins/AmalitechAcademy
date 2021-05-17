import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from '../app/entry/admin/admin.component';
import { LoginComponent } from '../app/entry/login/login.component';
import { StudentComponent } from '../app/entry/student/student.component';



const routes:Routes = [
  {path: "admin", component:AdminComponent},
  {path: "login", component:LoginComponent},
  {path: "student", component:StudentComponent}
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
