import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Department } from '../models/department.model';
import { Usergroup } from '../models/usergroup.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersapiService {

  constructor(private httpclient: HttpClient) { }

  // Department API End Points

  getDepartments(): Observable<any> {
    return this.httpclient.get("http://localhost:8083/api/departments")
  }

  postDepartment(department: Department): Observable<any> {
    return this.httpclient.post("http://localhost:8083/api/department", department)
  }

  updateDepartment(id, department: Department): Observable<any> {
    return this.httpclient.put("http://localhost:8083/api/department/" + id, department)
  }

  deleteDepartment(departmentId): Observable<any> {
    return this.httpclient.delete("http://localhost:8083/api/department/" + departmentId);
  }


  // Usergroup API End Points

  getUsergroups(): Observable<any> {
    return this.httpclient.get("http://localhost:8083/api/usergroups")
  }

  postUsergroup(usergroup: Usergroup): Observable<any> {
    return this.httpclient.post("http://localhost:8083/api/usergroup", usergroup)
  }

  updateUsergroup(id, usergroup: Usergroup): Observable<any> {
    return this.httpclient.put("http://localhost:8083/api/usergroup/" + id, usergroup)
  }

  deleteUsergroup(usergroupId): Observable<any> {
    return this.httpclient.delete("http://localhost:8083/api/usergroup/" + usergroupId);
  }

  // User API End Points

  getUsers(): Observable<any> {
    return this.httpclient.get("http://localhost:8083/api/users")
  }

  getUsersByDepartmentId(departmentId:string):Observable<any>{
    let param = new HttpParams().set("departmentId",departmentId);
    return this.httpclient.get("http://localhost:8083/api/users", {params:param})
  }

  getUsersByUsergroupId(usergroupId:string):Observable<any>{
    let param = new HttpParams().set("usergroupId",usergroupId);
    return this.httpclient.get("http://localhost:8083/api/users", {params:param})
  }

  getUsersByUsername(username:string):Observable<any>{
    let param = new HttpParams().set("username",username);
    console.log(param);
    return this.httpclient.get("http://localhost:8083/api/user", {params:param})
  }

  postUser(user: User): Observable<any> {
    console.log(user);
    return this.httpclient.post("http://localhost:8083/api/user", user)
  }

  updateUser(id, user: User): Observable<any> {
    return this.httpclient.put("http://localhost:8083/api/user/" + id, user)
  }

  deleteUser(userId): Observable<any> {
    return this.httpclient.delete("http://localhost:8083/api/user/" + userId);
  }
}