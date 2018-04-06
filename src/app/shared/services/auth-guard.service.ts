import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate  {

  constructor(
    private router:Router
  ) { }

  canActivate():boolean{
    let login = localStorage.getItem('login');
    if(login) return true;

    this.router.navigate(['/login']);
    return false;
  }

}
