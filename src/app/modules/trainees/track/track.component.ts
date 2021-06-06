import { Component, OnInit } from '@angular/core';
import { TraineesapiService } from "../../../shared/services/traineesapi.service";
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Track } from 'src/app/shared/models/track.model';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {
  private closeResult: string;

  constructor(private _traineesapiService: TraineesapiService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal) { }


  lstsTracks: Track[];

  trackForm = this.formBuilder.group(
    {
      name: new FormControl("", Validators.required),
      code: new FormControl("", Validators.required),
      isSuspended: new FormControl("", Validators.required),
    }
  )

  deleteId;
  editForm;


  ngOnInit() {
    this._traineesapiService.getTracks().subscribe(
      data => {
        this.lstsTracks = data;
      }
    )

    this.editForm = this.formBuilder.group({
      id: '',
      name: '',
      code: '',
      isSuspended: '',
    });
  }

  openEdit(targetModal, track: Track) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm.patchValue({
      id: track.id,
      name: track.name,
      code: track.code,
      isSuspended: track.isSuspended,
    });
  }

  onSave() {
    console.log(this.editForm.value)
    this._traineesapiService.updateTrack(this.editForm.value.id, this.editForm.value).subscribe((results) => {
      this.ngOnInit();
      this.modalService.dismissAll();
    });
  }


  openDelete(targetModal, track: Track) {
    this.deleteId = track.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }

  onDelete() {
    this._traineesapiService.deleteTrack(this.deleteId).subscribe((results) => {
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
      name: this.trackForm.value.name,
      code: this.trackForm.value.code,
      isSuspended: this.trackForm.value.isSuspended,
    }

    this._traineesapiService.postTrack(myForm).subscribe(
      data => {
        this.lstsTracks.push(data);
        this.ngOnInit();
        this.modalService.dismissAll();
      }
    )
    this.trackForm.reset();

  }


  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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
