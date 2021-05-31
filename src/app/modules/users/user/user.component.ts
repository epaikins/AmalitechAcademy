import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersapiService } from "../../../shared/services/usersapi.service";
import { User } from "../../../shared/models/user.model";



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  private closeResult: string;

  constructor(private _usersapiService: UsersapiService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal) { }


  lstsUsers: User[];

  userForm = this.formBuilder.group(
    {
      name: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required),
      department: new FormControl("", Validators.required),
      usergroup: new FormControl("", Validators.required)
    }
  )
  deleteId;
  editForm;


  ngOnInit() {
    this._usersapiService.getUsers().subscribe(
      data => {
        this.lstsUsers = data;
      }
    )
    this.editForm = this.formBuilder.group({
      id: '',
      name: '',
      email: '',
      department: '',
      usergroup: ''
    });
  }

  onAdd(): void {
      let myForm: any
      myForm = {
        name: this.userForm.value.name,
        email: this.userForm.value.email,
        department: {
          id: this.userForm.value.department,
        },
        usergroup: {
          id: this.userForm.value.usergroup
        }
      }

      this._usersapiService.postUser(myForm).subscribe(
        data => {
          this.lstsUsers.push(data);
          this.ngOnInit();
      this.modalService.dismissAll();
        }
      )
      this.userForm.reset();
    
  }

  onSave() {
    let myForm: any
    myForm = {
      id: this.editForm.value.id,
      department: {
        id: this.editForm.value.department,
      },
      name: this.editForm.value.name,
      email: this.editForm.value.email,
      usergroup: {
        id: this.editForm.value.usergroup
      }
    }

    this._usersapiService.updateUser(this.editForm.value.id, myForm).subscribe((results) => {
      this.ngOnInit();
      this.modalService.dismissAll();
    });
  }

  onDelete() {
    this._usersapiService.deleteUser(this.deleteId).subscribe((results) => {
      this.ngOnInit();
      this.modalService.dismissAll();
    });
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openAdd(targetModal) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }

  openEdit(targetModal, user: User) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm.patchValue({
      id: user.id,
      name: user.name,
      email: user.email,
      department: user.department.id,
      usergroup: user.usergroup.id
    });
  }

  openDelete(targetModal, user: User) {
    this.deleteId = user.id;
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
