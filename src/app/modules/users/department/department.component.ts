import { Component, OnInit } from '@angular/core';
import { UsersapiService } from "../../../shared/services/usersapi.service";
import { Department } from '../../../shared/models/department.model';
import {  FormBuilder, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css',
  '../../../entry/admin/admin.component.css']
})
export class DepartmentComponent implements OnInit {


  constructor(private _usersapiService:UsersapiService, private formBuilder:FormBuilder){}


  lstsDepartments:Department[];
  departmentForm = this.formBuilder.group(
    {
    name: new FormControl("", Validators.required)
  }
  )


  ngOnInit(){
    this._usersapiService.getDepartments().subscribe(
      data =>{
        this.lstsDepartments = data;
      }
    )
  }

  onAdd():void{
    if(this.lstsDepartments.filter(department => department.name === this.departmentForm.value.name).length == 0){
      let department = new Department();
      department.name = this.departmentForm.value.name;
      this._usersapiService.postDepartment(department).subscribe(
        data =>{
          this.lstsDepartments.push(data);
        }
      )
      this.departmentForm.reset();
    }
    else{
      alert("You cannot enter multiple department names...");
      this.departmentForm.reset();
    }
  }

}
