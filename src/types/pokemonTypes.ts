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
type PokemonType = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};
type SpriteVersions = {
  "generation-i": {
    "red-blue": {
      front_default: string;
    };
    yellow: {
      front_default: string;
    };
  };
  "generation-ii": {
    crystal: {
      front_default: string;
    };
    gold: {
      front_default: string;
    };
    silver: {
      front_default: string;
    };
  };
  "generation-iii": {
    [emerald: string]: {
      front_default: string;
    };
    "firered-leafgreen": {
      front_default: string;
    };
    "ruby-sapphire": {
      front_default: string;
    };
  };
  "generation-iv": {
    "diamond-perl": {
      front_default: string;
    };
    "heartgold-soulsilver": {
      front_default: string;
    };
    platinum: {
      front_default: string;
    };
  };
  "generation-v": {
    "black-white": {
      front_default: string;
    };
  };
  "generation-vi": {
    "omegaruby-alphasapphire": {
      front_default: string;
    };
    "x-y": {
      front_default: string;
    };
  };
  "generation-vii": {
    icons: {
      front_default: string;
    };
    "ultra-sun-ultra-moon": {
      front_default: string;
    };
  };
  "generation-viii": {
    icons: {
      front_default: string;
    };
  };
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
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
    versions: SpriteVersions;
  };
  stats: [];
  types: PokemonType[];
  weight: number;
};
export type {
  PokemonNameAndUrl,
  Pokemon,
  Ability,
  EffectEntry,
  SpriteVersions,
};
