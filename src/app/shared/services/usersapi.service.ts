import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Department } from '../models/department.model';

@Injectable({
  providedIn: 'root'
})
export class UsersapiService {

  constructor(private httpclient:HttpClient) { }

  getDepartments():Observable<any>{
    return this.httpclient.get("http://localhost:8083/api/departments")
  }

  postDepartment(department:Department):Observable<any>{
    return this.httpclient.post("http://localhost:8083/api/department",department)
  }
  
}
