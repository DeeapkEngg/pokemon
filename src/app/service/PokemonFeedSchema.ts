export interface PokemonFeed {
     count: number,
     next: string | null,
     previous: string | null,
     results:  Array<Pokemon>
}

export interface Pokemon {
  name: string,
  url: string,
  id: string 
}
export interface Image{
  front_default: string,
}

export interface Obj {
  name: string,
  url:  string,
}
export interface Ability{
  ability: Obj,
  is_hidden: boolean,
  slot: string
}

export interface Stat {
  base_stat: string,
  effort: 0,
  stat: Obj,
}
export interface Type{
  slot: string,
  type: Obj,
}
export interface flavor_text_entry {
  flavor_text: string,
  language: Obj,
  version: Obj,
}
export interface PokemonDetails {
  sprites: Image,
  species: Obj,
  stats: Array<Stat>,
  types: Array<Type>,
  weight:  number,
  height: string,
  abilities: Array<Ability>,
  name: string,
  colors?: string,
  eggGroups?: string,
  evolvedImg?: string,
  evolvedName?: string,
  ability?: string,
  profileImg?: string,
  base_experience: number,
  id?:number,
  level?:number,
  moves?: Array<Move>,
  capture_rate?: number,
  gender_rate?: string,
  hatch_counter?: number,
}

export interface damageClass{
  damage_class: Obj
}
export interface PokemonSpecies {
  egg_groups: Array<Obj>,
  color: Obj,
  evolution_chain: { url: string},
  flavor_text_entries: Array<flavor_text_entry>,
  capture_rate?: number,
  gender_rate?: number,
  hatch_counter?: number,
}

export interface EvolutionDetails{
 chain : {
   evolves_to: Array<{
   
    evolution_details:  Array<{
      min_level: string,
    }>,
    evolves_to: any,
    species: Obj,
   }>,
   species: Obj,
 }
}

export interface Evolved {
  species: string,
  level: number
}
export interface Move {
 move: Obj
}

export interface Product{
  name: string,
  description: string,
  price: number,
  category: string,
  imageUrl: string,
  phoneNumber: number,
  select?: string
}