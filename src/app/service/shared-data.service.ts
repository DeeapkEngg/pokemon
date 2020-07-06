import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  searchBarChange: Subject<string> = new Subject<string>();

  sendValue(val:string){
      this.searchBarChange.next(val)
  }

  getValue(): Observable<string> {
      return this.searchBarChange.asObservable();
  }

}
