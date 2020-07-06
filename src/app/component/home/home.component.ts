import { Component, OnInit } from '@angular/core';
import { PokemonFeedService } from '../../service/pokemon-feed.service';
import { Pokemon, PokemonFeed } from '../../service/PokemonFeedSchema';
import { SharedDataService } from 'src/app/service/shared-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  headerVal: string = null
  pokeFeed: Array<Pokemon> = []
  next: string = 'https://pokeapi.co/api/v2/pokemon/?limit=30&offset=0'
  previous: string = null
  link:string ="/home/detail/pokemon"
  constructor(private pokemon: PokemonFeedService, 
    public route: ActivatedRoute,
    private head: SharedDataService) {    
  }

  ngOnInit(): void {
    this.fetchingData(this.next)   
    this.head.getValue().subscribe(data => this.headerVal =  data)
  }
   
   pageHandler(button: string): void{
      if(button === 'previous' && this.previous){
        this.fetchingData(this.previous)
      } else if(button === 'next' && this.next) {
        this.fetchingData(this.next)
      }
      
    }

    fetchingData(url:string) {
        this.pokemon.getPokemonFeed(url).subscribe((data:PokemonFeed)  => {
        const { results, next, previous } = data
        this.pokeFeed = results
        results.map((item:Pokemon) => {
            let su = item.url.split("/")
            item.id =  su[su.length-2]
            this.pokemon.getPokemonImage(`https://pokeapi.co/api/v2/pokemon-form/${item.id}/`).subscribe((pokemonImage:string) => {
            item.url =  pokemonImage
          })
        })
        this.next = next
        this.previous = previous
      })
  }
}
