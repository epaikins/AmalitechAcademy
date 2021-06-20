import { Component, OnInit } from '@angular/core';
import { UsersapiService } from "../..../../../shared/services/usersapi.service";
import { NgForm } from '@angular/forms';
import { User } from 'src/app/shared/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = new User();

  constructor(private userService:UsersapiService, private route:Router) { }

  ngOnInit(): void {
  }

  loginUser(){
    this.userService.loginUser(this.user).subscribe(
      data => {
        if(data.usergroup.name === "Trainee"){
          this.route.navigate(["/student"])
        }
        if(data.usergroup.name === "Admin"){
          this.route.navigate(["/admin"])
        }
      },
      error => console.log("Bad routing")
    );
  }

}
