import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from '../../entry/admin/admin.component';
import { BatchComponent } from './batch/batch.component';
import { TrackComponent } from './track/track.component';
import { TraineeComponent } from './trainee/trainee.component';
import { TraineesoverviewComponent } from './traineesoverview/traineesoverview.component';


const routes: Routes = [
    {
        path: "admin", component: AdminComponent, children: [
            {
                path: 'traineesoverview', component: TraineesoverviewComponent, children: [
                    { path: 'batches', component: BatchComponent },
                    { path: 'tracks', component: TrackComponent },
                    { path: 'trainees', component: TraineeComponent },
                ]
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class TraineeRoutingModule { }