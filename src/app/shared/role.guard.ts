import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthService,
    private router: Router){
}
  canActivate() {
    let Role = localStorage.getItem("userType");
    if(this.auth.isSignedIn()&& Role == "Admin"){
      return true;
    } 
    this.router.navigate(['signin']);
    alert("You need to Sign In or you don't have Admin permission!")
    return false;
  }
  
}
