import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TraineeRoutingModule } from './trainee-routing.module';

import { BatchComponent } from '../../modules/trainees/batch/batch.component';
import { TrackComponent } from '../../modules/trainees/track/track.component';
import { TraineeComponent } from '../../modules/trainees/trainee/trainee.component';
import { TraineesoverviewComponent } from './traineesoverview/traineesoverview.component';



@NgModule({
  declarations: [
    BatchComponent,
    TrackComponent,
    TraineeComponent,
    TraineesoverviewComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TraineeRoutingModule,
    FormsModule
  ]
})
export class TraineesModule { }
