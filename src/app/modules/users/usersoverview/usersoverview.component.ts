import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usersoverview',
  templateUrl: './usersoverview.component.html',
  styleUrls: ['./usersoverview.component.css',
'../../../entry/admin/admin.component.css']
})
export class UsersoverviewComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  btnClick() {
    this.router.navigateByUrl('/departments');
};

}
