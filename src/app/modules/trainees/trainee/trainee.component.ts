import { Component, OnInit } from '@angular/core';
import { TraineesapiService } from "../../../shared/services/traineesapi.service";
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Trainee } from '../../../shared/models/trainee.model';
import { Batch } from 'src/app/shared/models/batch.model';
import { Track } from 'src/app/shared/models/track.model';

@Component({
  selector: 'app-trainee',
  templateUrl: './trainee.component.html',
  styleUrls: ['./trainee.component.css']
})
export class TraineeComponent implements OnInit {
  private closeResult: string;

  constructor(private _traineesapiService: TraineesapiService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal) { }

  lstsTracks:Track[];
  lstsTrainees: Trainee[];
  lstsBatches: Batch[];

  trackForm = this.formBuilder.group(
    {
      firstName: new FormControl("", Validators.required),
      lastName: new FormControl("", Validators.required),
      dob: new FormControl("", Validators.required),
      batch: new FormControl("", Validators.required),
      status: new FormControl("", Validators.required),
    }
  )

  enrollForm = this.formBuilder.group(
    {
      track: new FormControl("", Validators.required),
      trainee: new FormControl("", Validators.required),
    }
  )

  deleteId;
  editForm;

  ngOnInit() {
    this._traineesapiService.getTrainees().subscribe(
      data => {
        this.lstsTrainees = data;
      }
    )
    this._traineesapiService.getBatches().subscribe(
      data => {
        this.lstsBatches = data;
      }
    )
    this._traineesapiService.getTracks().subscribe(
      data => {
        this.lstsTracks = data;
      }
    )

    this.editForm = this.formBuilder.group({
      id:'',
      firstName:'',
      lastName:'',
      dob:'',
      batch:'',
      status:''
    });
  }

  openEnroll(targetModal) {
    this.modalService.open(targetModal, {
      size: 'lg'
    });
  }

  onEnroll(): void {
    let trainee:Trainee;
    this._traineesapiService.enrollTraineeToTrack(this.enrollForm.value.track,this.enrollForm.value.trainee,trainee).subscribe(
      data => {
        this.ngOnInit();
        this.modalService.dismissAll();
      }
    )
    this.enrollForm.reset();
  
  }

  openAdd(targetModal) {
    this.modalService.open(targetModal, {
      size: 'lg'
    });
  }
  
  onAdd(): void {
    let myForm: any
    myForm = {
      firstName: this.trackForm.value.firstName,
      lastName: this.trackForm.value.lastName,
      dob: this.trackForm.value.dob,
      batch: { 
        id :this.trackForm.value.batch
      },
      status: this.trackForm.value.status
    }
  
    this._traineesapiService.postTrainee(myForm).subscribe(
      data => {
        this.lstsTrainees.push(data);
        this.ngOnInit();
    this.modalService.dismissAll();
      }
    )
    this.trackForm.reset();
  
  }

  openEdit(targetModal, trainee: Trainee) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm.patchValue({
      id: trainee.id,
      firstName: trainee.firstName,
      lastName: trainee.lastName,
      dob: trainee.dob,
      batch:trainee.batch.id,
      status:trainee.status
    });
  }

  onSave() {
    let batchId = this.editForm.value.batch;

    this.editForm.patchValue({
      id: this.editForm.value.id,
      firstName: this.editForm.value.firstName,
      lastName: this.editForm.value.lastName,
      dob: this.editForm.value.dob,
      batch:{
        id: batchId
      },
      status:this.editForm.value.status
    });

    this._traineesapiService.updateTrainee(this.editForm.value.id, this.editForm.value).subscribe((results) => {
      this.ngOnInit();
      this.modalService.dismissAll();
    });
  }


  openDelete(targetModal, trainee: Trainee) {
    this.deleteId = trainee.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }
  
   onDelete() {
    this._traineesapiService.deleteTrainee(this.deleteId).subscribe((results) => {
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
