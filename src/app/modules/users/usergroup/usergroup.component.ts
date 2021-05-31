import { Component, OnInit } from '@angular/core';
import { UsersapiService } from "../../../shared/services/usersapi.service";
import { Usergroup } from '../../../shared/models/usergroup.model'
import {  FormBuilder, FormControl, Validators } from '@angular/forms';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-usergroup',
  templateUrl: './usergroup.component.html',
  styleUrls: ['./usergroup.component.css']
})
export class UsergroupComponent implements OnInit {

  private closeResult:string;

  constructor(private _usersapiService:UsersapiService, 
    private formBuilder:FormBuilder,
    private modalService: NgbModal){}


  lstsUsergroups:Usergroup[];

  usergroupForm = this.formBuilder.group(
    {
    name: new FormControl("", Validators.required)
  }
  )
  deleteId;
  editForm;


  ngOnInit(){
    
    this._usersapiService.getUsergroups().subscribe(
      data =>{
        this.lstsUsergroups = data;
      }
    )

    this.editForm = this.formBuilder.group({
      id: '',
      name: ''
    });
  }

  onAdd():void{
    if(this.lstsUsergroups.filter(usergroup => usergroup.name === this.usergroupForm.value.name).length == 0){
      let usergroup = new Usergroup();
      usergroup.name = this.usergroupForm.value.name;
      this._usersapiService.postUsergroup(usergroup).subscribe(
        data =>{
          this.lstsUsergroups.push(data);
        }
      )
      this.usergroupForm.reset();
    }
    else{
      alert("You cannot enter multiple usergroup names...");
      this.usergroupForm.reset();
    }
  }

  onSave() {
     this._usersapiService.updateUsergroup(this.editForm.value.id,this.editForm.value).subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }

  onDelete() {
    this._usersapiService.deleteUsergroup(this.deleteId).subscribe((results) => {
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

  openEdit(targetModal, usergroup:Usergroup) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm.patchValue( {
      id: usergroup.id, 
      name: usergroup.name
    });
  }

  openDelete(targetModal, usergroup: Usergroup) {
    this.deleteId = usergroup.id;
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
