import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Department } from '../models/department.model';
import { Usergroup } from '../models/usergroup.model';

@Injectable({
  providedIn: 'root'
})
export class UsersapiService {

  constructor(private httpclient:HttpClient) { }

  // Department API End Points

  getDepartments():Observable<any>{
    return this.httpclient.get("http://localhost:8083/api/departments")
  }

  postDepartment(department:Department):Observable<any>{
    return this.httpclient.post("http://localhost:8083/api/department",department)
  }

  updateDepartment(id,department:Department):Observable<any>{
    return this.httpclient.put("http://localhost:8083/api/department/"+id,department)
  }

  deleteDepartment(departmentId):Observable<any>{
    return this.httpclient.delete("http://localhost:8083/api/department/"+departmentId);
  }


  // Usergroup API End Points

  getUsergroups():Observable<any>{
    return this.httpclient.get("http://localhost:8083/api/usergroups")
  }

  postUsergroup(usergroup:Usergroup):Observable<any>{
    return this.httpclient.post("http://localhost:8083/api/usergroup",usergroup)
  }

  updateUsergroup(id,usergroup:Usergroup):Observable<any>{
    return this.httpclient.put("http://localhost:8083/api/usergroup/"+id,usergroup)
  }

  deleteUsergroup(usergroupId):Observable<any>{
    return this.httpclient.delete("http://localhost:8083/api/usergroup/"+usergroupId);
  }
  
}