import { Department } from "./department.model";
import { Usergroup } from "./usergroup.model";

export class User{
    id:number;
    name:String;
    email:String;
    department:Department;
    usergroup:Usergroup;
}