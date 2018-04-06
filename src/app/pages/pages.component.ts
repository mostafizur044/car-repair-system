import { Component, AfterViewInit,HostListener } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements AfterViewInit {

  public toggole:Boolean = false;

  constructor(
    private router:Router
  ){}

  ngAfterViewInit(){
    let w = window.innerWidth;
    if(w<768) {
      document.getElementById('sidenav').style.display = 'none';
      this.toggole = false;
    }
  }

  @HostListener('window:resize',['$event'])
  onResize(e){
    let w = window.innerWidth;
    if(w>767) document.getElementById('sidenav').style.display = 'block';
    else {
      document.getElementById('sidenav').style.display = 'none';
      this.toggole = false;
    }
  }

  
  toggoleSidenav(){
    this.toggole = !this.toggole;
    if(this.toggole) document.getElementById('sidenav').style.display = 'block';
    else document.getElementById('sidenav').style.display = 'none';
  }

  hideSidenav(){
    let w = window.innerWidth;
    if(w<768) {
      document.getElementById('sidenav').style.display = 'none';
      this.toggole = false;
    }
  }

  logOut(){
    window.localStorage.removeItem('login');
    this.router.navigate(['/login']);
  }
  

}
