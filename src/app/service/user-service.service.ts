import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  isAdmin: boolean =  true
  constructor() { }

  getProfile() {
    return of(this.isAdmin)
  }
}
