import { Injectable } from '@angular/core';
import { UserServiceService } from './user-service.service';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  canActivate(): boolean{
    if (!this.profile.isAdmin){
      this.route.navigate(['home']);
      return false;
    }
    return true;
  }


  constructor(private profile: UserServiceService, private route: Router) {

  }
}
