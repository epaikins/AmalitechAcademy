import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UsersapiService } from "../../../shared/services/usersapi.service";
import { Department } from '../../../shared/models/department.model';
import {  FormBuilder, FormControl, Validators } from '@angular/forms';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css',
  '../../../entry/admin/admin.component.css'],
})
export class DepartmentComponent implements OnInit {

  private closeResult:string;

  constructor(private _usersapiService:UsersapiService, 
    private formBuilder:FormBuilder,
    private modalService: NgbModal){}


  lstsDepartments:Department[];

  departmentForm = this.formBuilder.group(
    {
    name: new FormControl("", Validators.required)
  }
  )
  deleteId;
  editForm;


  ngOnInit(){
    this._usersapiService.getDepartments().subscribe(
      data =>{
        this.lstsDepartments = data;
      }
    )
    this.editForm = this.formBuilder.group({
      id: '',
      name: ''
    } );
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

  onSave() {
     this._usersapiService.updateDepartment(this.editForm.value.id,this.editForm.value).subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }

  onDelete() {
    this._usersapiService.deleteDepartment(this.deleteId).subscribe((results) => {
       this.ngOnInit();
       this.modalService.dismissAll();
     });
 }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openEdit(targetModal, department:Department) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm.patchValue( {
      id: department.id, 
      name: department.name
    });
  }

  openDelete(targetModal, department: Department) {
    this.deleteId = department.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
