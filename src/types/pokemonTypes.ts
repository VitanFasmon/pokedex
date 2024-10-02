type PokemonNameAndUrl = {
  name: string;
  url: string;
};
type AbilityList = {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
};
type EffectEntry = {
  effect: string;
  language: { name: string; url: string };
};
type Ability = {
  effect_entries: EffectEntry[];
  id: number;
  name: string;
};
type Pokemon = {
  abilities: AbilityList[];
  base_experience: number;
  cries: {};
  forms: [];
  game_indices: [];
  height: number;
  held_items: [];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: [];
  name: string;
  order: 1;
  past_abilities: [];
  past_types: [];
  species: {};
  sprites: {
    front_default: string;
  };
  stats: [];
  types: [];
  weight: number;
};
export type { PokemonNameAndUrl, Pokemon, Ability, EffectEntry };
