import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonFeedService } from 'src/app/service/pokemon-feed.service';
import { AppSettings } from '../../common/constant';
import {
  PokemonDetails, PokemonSpecies,
  EvolutionDetails, DamageClass, Move } from 'src/app/service/PokemonFeedSchema';
import { Subscription } from 'rxjs';
import { LoaderComponent } from 'src/app/common/loader/loader.component';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit, OnDestroy {
  constructor(private feed: PokemonFeedService,  private route: ActivatedRoute) {

  }

  filterVal: string;
  color: string;
  colorDict: object = {
    ground: 'gray',
    psychic: 'pink',
    flying: 'violet',
    fire: 'Orange',
    ice: 'skyblue',
    fighting: 'maroon',
    fairy: 'lightpink',
    water: 'Blue',
    electric: '#a0a029',
    grass: 'green',
    poison: '#330b33'
  };
  pokemon: PokemonDetails;
  evolution: Array<any> = [];
  damage: object = {};
  destroyer: Subscription;
  loader = false;
  ngOnDestroy(): void {
    this.destroyer.unsubscribe();
  }

  ngOnInit(): void {

  this.route.params.subscribe(data =>  {
      const { id } = data;

      if (id){
      this.evolution.length = 0;
      this.damage = {};
      this.loader = true;
      this.destroyer = this.feed.getDetails(`${AppSettings.POKEMON_API}/${id}/`)
      .subscribe((pokemont: PokemonDetails) => {

         const { species: { url }, moves  } =  pokemont;
         const { name: currentPokemon } = pokemont;

         moves.forEach((move: Move) => {
           this.feed.getDetails(move.move.url)
            .subscribe((item: DamageClass) => {
              this.damage[item.damage_class.name] = item.damage_class.name;
           });
         });

         this.feed.getDetails(url).
         subscribe((speciesDet: PokemonSpecies) => {

             const { evolution_chain: { url : speciesUrl }} = speciesDet;

             this.feed.getDetails(speciesUrl)
             .subscribe((evolutionData: EvolutionDetails) => {

                this.evolutionChain(evolutionData);
                const nextEvolutionName = this.nextEvolveStage(currentPokemon);
                this.pokemon = {
                  ...pokemont,
                   colors: speciesDet.color.name,
                   ability: pokemont.abilities.map(item => item.ability.name).join(','),
                   eggGroups: this.extractorArray(speciesDet.egg_groups).join(','),
                   profileImg: pokemont.sprites.front_default,
                   evolvedImg: null,
                   capture_rate: speciesDet.capture_rate,
                   hatch_counter: (speciesDet.hatch_counter + 1) * 255,
                   gender_rate: (speciesDet.gender_rate / 80).toPrecision(1),
                   weight: (pokemont.weight / 10),
                 };
                this.color = speciesDet.color.name;
                this.loader = false;
                if (nextEvolutionName !== -1){
                  this.feed.getDetails(`${AppSettings.POKEMON_FORM}/${nextEvolutionName.name}/`)
                  .subscribe((evolvePokemon: PokemonDetails) => {

                      const { sprites: { front_default}, name } = evolvePokemon;
                      this.pokemon = {
                          ...this.pokemon,
                          evolvedName: name,
                          evolvedImg: front_default,
                          level: nextEvolutionName[nextEvolutionName.name]
                     };
                   });
                 }
             });
          });
       });

     }
  });
 }

  extractorArray(obj: any){
    const temp = [];
    for (const x of obj){
      temp.push(x.name);
    }
    return temp;
  }

  colorType(type: string){
    return this.colorDict[type.toLowerCase()] || 'gray';
  }

  evolutionChain(evolutionData: EvolutionDetails){
    const { chain: { species : { name }, evolves_to} } =  evolutionData;
    const obj = {
      [name] : 0,
      name
    };
    this.evolution.push(obj);
    this.level(evolves_to);
  }


  level(ev: any){
    if (ev && ev.length){
        const obj = {
          [ev[0].species.name] : ev[0].evolution_details[0].min_level,
          name:  ev[0].species.name
        };
        this.evolution.push(obj);
        this.level(ev[0].evolves_to);
    }
  }

  nextEvolveStage(currentPokemon: string){
    let  i = 0;
    for ( ; i < this.evolution.length ; i++){
      if (this.evolution[i].name === currentPokemon){
        break;
      }
    }
    if (i + 1 <= this.evolution.length - 1){
      return this.evolution[i + 1];
    } else {
      return  -1;
    }

  }

  getDamaged(){
    return Object.keys(this.damage);
  }

  randomColor(i: number){
    const randomColor = i % 11;
    return this.colorDict[Object.keys(this.colorDict)[randomColor]];
  }
}
