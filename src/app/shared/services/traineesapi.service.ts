import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Batch } from '../models/batch.model';
import { Track } from '../models/track.model';
import { Trainee } from '../models/trainee.model';

@Injectable({
    providedIn: 'root'
})
export class TraineesapiService {

    constructor(private httpclient: HttpClient) { }

    // Batch API End Points

    getBatches(): Observable<any> {
        return this.httpclient.get("http://localhost:8083/api/batches")
    }

    postBatch(batch: Batch): Observable<any> {
        return this.httpclient.post("http://localhost:8083/api/batch", batch)
    }

    updateBatch(id, batch: Batch): Observable<any> {
        return this.httpclient.put("http://localhost:8083/api/batch/" + id, batch)
    }

    deleteBatch(batchId): Observable<any> {
        return this.httpclient.delete("http://localhost:8083/api/batch/" + batchId);
    }


    // Track API End Points

    getTracks(): Observable<any> {
        return this.httpclient.get("http://localhost:8083/api/tracks")
    }

    postTrack(track: Track): Observable<any> {
        return this.httpclient.post("http://localhost:8083/api/track", track)
    }

    updateTrack(id, track: Track): Observable<any> {
        return this.httpclient.put("http://localhost:8083/api/track/" + id, track)
    }

    deleteTrack(trackId): Observable<any> {
        return this.httpclient.delete("http://localhost:8083/api/track/" + trackId);
    }



    // Trainee API End Points

    getTrainees(): Observable<any> {
        return this.httpclient.get("http://localhost:8083/api/trainees")
    }

    postTrainee(trainee: Trainee): Observable<any> {
        return this.httpclient.post("http://localhost:8083/api/trainee", trainee)
    }

    updateTrainee(id, trainee: Trainee): Observable<any> {
        return this.httpclient.put("http://localhost:8083/api/trainee/" + id, trainee)
    }

    deleteTrainee(traineeId): Observable<any> {
        return this.httpclient.delete("http://localhost:8083/api/trainee/" + traineeId);
    }

    // Enroll Trainee on a Track API End Point
    // enrollTraineeToTrack(trackId, traineeId): Observable<any> {
    //     return this.httpclient.put(`http://localhost:8083/api/track/${trackId}/trainee/${traineeId}`,)
    // }


}