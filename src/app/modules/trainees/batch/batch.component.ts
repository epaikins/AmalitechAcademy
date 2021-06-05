import { Component, OnInit } from '@angular/core';
import { TraineesapiService } from "../../../shared/services/traineesapi.service";
import {  FormBuilder, FormControl, Validators } from '@angular/forms';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Batch } from 'src/app/shared/models/batch.model';

@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.css']
})
export class BatchComponent implements OnInit {

  private closeResult:string;

  constructor(private _traineesapiService:TraineesapiService, 
    private formBuilder:FormBuilder,
    private modalService: NgbModal){}


  lstsBatches:Batch[];

  batchForm = this.formBuilder.group(
    {
    name: new FormControl("", Validators.required),
    batchStatus: new FormControl("", Validators.required),
    beginningDate: new FormControl("", Validators.required),
    endingDate: new FormControl("", Validators.required)
  }
  )

  deleteId;
  editForm;

  ngOnInit(){
    this._traineesapiService.getBatches().subscribe(
      data =>{
        this.lstsBatches = data;
      }
    )

    this.editForm = this.formBuilder.group({
      id: '',
      name: '',
      batchStatus: '',
      beginningDate: '',
      endingDate: ''
    } );
  }


  openEdit(targetModal, batch:Batch) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm.patchValue({
      id: batch.id, 
      name: batch.name,
      batchStatus: batch.batchStatus,
      beginningDate: batch.beginningDate,
      endingDate: batch.endingDate,
    });
  }

  onSave() {
    this._traineesapiService.updateBatch(this.editForm.value.id,this.editForm.value).subscribe((results) => {
       this.ngOnInit();
       this.modalService.dismissAll();
     });
 }

 openDelete(targetModal, batch: Batch) {
  this.deleteId = batch.id;
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
}

 onDelete() {
  this._traineesapiService.deleteBatch(this.deleteId).subscribe((results) => {
     this.ngOnInit();
     this.modalService.dismissAll();
   });
}

openAdd(targetModal) {
  this.modalService.open(targetModal, {
    size: 'lg'
  });
}

onAdd(): void {
  let myForm: any
  myForm = {
    name: this.batchForm.value.name,
    batchStatus: this.batchForm.value.batchStatus,
    beginningDate: this.batchForm.value.beginningDate,
    endingDate: this.batchForm.value.endingDate
  }

  this._traineesapiService.postBatch(myForm).subscribe(
    data => {
      this.lstsBatches.push(data);
      this.ngOnInit();
  this.modalService.dismissAll();
    }
  )
  this.batchForm.reset();

}

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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
