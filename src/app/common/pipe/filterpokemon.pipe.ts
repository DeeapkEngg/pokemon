import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from 'src/app/service/PokemonFeedSchema';

@Pipe({
  name: 'filterpokemon'
})
export class FilterpokemonPipe implements PipeTransform {

  transform(pokemon:Pokemon[], value:string): Pokemon[] {
    if(!value || !pokemon || (value && value.length <3)){
     return pokemon
    } 
    return pokemon.filter((item:Pokemon) => item.name.toLowerCase().startsWith(value.toLowerCase()))
 
  }
}
