import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:string = '';
  password:string = '';

  constructor(
    private router:Router
  ) { }

  ngOnInit() {
  }

  login(){
    if(this.user=='mostafiz'&& this.password=='12345')
     {
      this.router.navigate(['/dashboard']);
      localStorage.setItem('login',JSON.stringify({user:this.user,pass:this.password}));
     } 
  }

}
