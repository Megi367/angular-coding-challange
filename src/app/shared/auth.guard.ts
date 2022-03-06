import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService,
              private router: Router){

  }
  canActivate(){
    if(this.auth.isSignedIn()){
      return true;
    }
    this.router.navigate(['signin']);
    alert("You Must Sign In First!")
    return false;
  }
}
