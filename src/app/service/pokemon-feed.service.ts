import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map, } from 'rxjs/operators';
import { PokemonFeed, PokemonDetails, Product, } from './PokemonFeedSchema';

@Injectable({
  providedIn: 'root'
})
export class PokemonFeedService {
  productList: Array<Product> = [];
  constructor(public http: HttpClient) { }

  getPokemonImage(url: string): Observable<string> {
    return this.http.get<PokemonDetails>(url).pipe(
       map((item: PokemonDetails) => item.sprites.front_default));
  }
  getPokemonFeed(url: string): Observable<PokemonFeed>{
    return this.http.get<PokemonFeed>(url)
    .pipe(
       catchError(this.handleError)
    );
  }

  handleError(err: HttpErrorResponse){
    return throwError(err);
  }


  getDetails(url: string){
    return this.http.get(url);
  }

  getData() {
    const data =  window.localStorage.getItem('productList') || '[]';
    const check = JSON.parse(data);
    if (check.length){
      this.productList = check;
    }
    return check;
  }
}
