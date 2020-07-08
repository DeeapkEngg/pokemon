import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { PokemonFeedService } from './pokemon-feed.service';

@Injectable({
  providedIn: 'root'
})
export class ProductListGuardService implements CanActivate{
  canActivate() {
     const productList = this.pokemonFeed.getData();
     if (productList.length === 0){
       this.route.navigate(['home']);
       return false;
     }
     return true;
   }

  constructor(private pokemonFeed: PokemonFeedService, private route: Router) { }
}
