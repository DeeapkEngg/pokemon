import { Component, OnInit } from '@angular/core';
import { PokemonFeedService } from 'src/app/service/pokemon-feed.service';
import { Pokemon, PokemonDetails, PokemonSpecies, EvolutionDetails, Evolved, Obj, damageClass, Move } from 'src/app/service/PokemonFeedSchema';
import { SharedDataService } from 'src/app/service/shared-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {
  
  filterVal: string
  color: string
  colorDict: Object = {
    ground: 'gray',
    psychic: 'pink',
    flying: 'violet',
    fire: 'Orange',
    ice: 'skyblue',
    fighting: 'maroon',
    fairy: 'lightpink',
    water: 'Blue',
    electric:'#a0a029',
    grass: 'green',
    poison: '#330b33'
  }
  pokemon: PokemonDetails
  evolution:Array<any> = []
  damage: Object= {}
  constructor(private feed: PokemonFeedService,  private route: ActivatedRoute) { 

  }

  ngOnInit(): void {
    
  this.route.params.subscribe(data =>  {
      const { id } = data
     
      if(id){
      this.evolution.length = 0
      this.damage = {}
      this.feed.getDetails(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .subscribe((pokemont:PokemonDetails) => {
       
         const { species: { url },moves  } =  pokemont
         const { name: currentPokemon } = pokemont

         moves.forEach((move: Move) =>{
           this.feed.getDetails(move.move.url)
            .subscribe((item:damageClass) => {
              this.damage[item.damage_class.name] = item.damage_class.name
           })
         })
         this.feed.getDetails(url).
         subscribe((speciesDet: PokemonSpecies) => {
             const { evolution_chain: { url }} = speciesDet
             this.feed.getDetails(url)
             .subscribe((evolutionData:EvolutionDetails) => {
                this.evolutionChain(evolutionData)
                const nextEvolutionName = this.nextEvolveStage(currentPokemon)
                this.pokemon = {
                  ...pokemont,
                   colors: speciesDet.color.name,
                   ability: pokemont.abilities.map(item => item.ability.name).join(","),
                   eggGroups: this.extractorArray(speciesDet.egg_groups).join(','),
                   profileImg: pokemont.sprites.front_default,
                   evolvedImg: null,
                   capture_rate: speciesDet.capture_rate,
                   hatch_counter: (speciesDet.hatch_counter +1)*255,
                   gender_rate: (speciesDet.gender_rate / 80).toPrecision(1),
                   weight: (pokemont.weight / 10),
                 }
                 this.color = speciesDet.color.name
                if(nextEvolutionName !== -1){
                  this.feed.getDetails(`https://pokeapi.co/api/v2/pokemon-form/${nextEvolutionName.name}/`)
                  .subscribe((evolvePokemon: PokemonDetails) => {
                      const { sprites: { front_default},name } = evolvePokemon
                        this.pokemon = {
                          ...this.pokemon,
                          evolvedName: name,
                          evolvedImg: front_default,
                          level: nextEvolutionName[nextEvolutionName.name]
                        }
                     
                 })
                }
             }) 
         })
         })
        }
   })
  
  }

  extractorArray(obj:any){
    let temp = []
    for(let x of obj){
      temp.push(x.name) 
    }
    return temp;
  }

  colorType(type:string){
    return this.colorDict[type.toLowerCase()] || "gray"
  }

  evolutionChain(evolutionData: EvolutionDetails){
    const { chain: { species : { name }, evolves_to} }=  evolutionData
    const obj = {
      [name] : 0,
      name: name
    }
    this.evolution.push(obj)
    this.level(evolves_to)
  }
  

  level(ev:any){
    if(ev.length){
        const obj = {
          [ev[0].species.name] : ev[0].evolution_details[0].min_level,
          name:  ev[0].species.name
        }
        this.evolution.push(obj)
        this.level(ev[0].evolves_to)
    }
  }

  nextEvolveStage(currentPokemon: string){
    let  i = 0
    for( ;i< this.evolution.length ; i++){
      if(this.evolution[i].name === currentPokemon){
        break;
      }
    }
    if(i+1 <= this.evolution.length-1){
      return this.evolution[i+1]
    } else {
      return  -1
    }
    
  }

  getDamaged(){
    return Object.keys(this.damage)
  }

  randomColor(i:number){
    var randomColor = i % 11;
    return this.colorDict[Object.keys(this.colorDict)[randomColor]]
  }
}
