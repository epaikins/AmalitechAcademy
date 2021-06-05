import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Batch } from '../models/batch.model';

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


}