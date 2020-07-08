import { Component, OnInit, OnDestroy } from '@angular/core';
import { PokemonFeedService } from '../../service/pokemon-feed.service';
import { Pokemon, PokemonFeed } from '../../service/PokemonFeedSchema';
import { SharedDataService } from 'src/app/service/shared-data.service';
import { AppSettings } from '../../common/constant';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(private pokemon: PokemonFeedService,
              public route: ActivatedRoute,
              private head: SharedDataService) {
  }
  headerVal: string = null;
  pokeFeed: Array<Pokemon> = [];
  next = AppSettings.NEXT;
  previous: string = null;
  link = AppSettings.LINK;
  loader = false;
  destroyer: Subscription;
  ngOnDestroy(): void {
   this.destroyer.unsubscribe();
  }

  ngOnInit(): void {
    this.fetchingData(this.next);
    this.head.getValue().subscribe(data => this.headerVal =  data);

  }

   pageHandler(button: string): void{
      if (button === 'previous' && this.previous){
        this.fetchingData(this.previous);
      } else if (button === 'next' && this.next) {
        this.fetchingData(this.next);
      }

    }

    fetchingData(url: string) {
       this.loader = true;
       this.destroyer =  this.pokemon.getPokemonFeed(url).subscribe((data: PokemonFeed)  => {
        const { results, next, previous } = data;
        this.pokeFeed = results;
        results.map((item: Pokemon) => {
            const su = item.url.split('/');
            item.id =  su[su.length - 2];
            this.pokemon.getPokemonImage(`${AppSettings.POKEMON_FORM}/${item.id}/`)
            .subscribe((pokemonImage: string) => {
               item.url =  pokemonImage;
          });
        });
        this.next = next;
        this.previous = previous;
        this.loader = false;
      });
  }
}
