import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  isAdmin =  true;
  constructor() { }

  getProfile() {
    return of(this.isAdmin);
  }
}
