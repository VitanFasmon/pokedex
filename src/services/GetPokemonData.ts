import { Ability, EffectEntry, Pokemon } from "../types/pokemonTypes";

const LIMIT = "100";
const POKEMON_LIST_URL = `https://pokeapi.co/api/v2/pokemon`;
const getPokemonList = async () => {
  try {
    const response = await fetch(`${POKEMON_LIST_URL}?limit=${LIMIT}`);

    if (!response.ok) {
      throw new Error("Failed to fetch Pokémon list");
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching Pokémon list:", error);
    return [];
  }
};
const getPokemonInfo = async (POKEMON_URL: string): Promise<Pokemon | null> => {
  try {
    const response = await fetch(POKEMON_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch Pokémon");
    }

    const data: Pokemon = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    return null;
  }
};
const getAbility = async (ABILITY_URL: string): Promise<Ability | null> => {
  try {
    const response = await fetch(ABILITY_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch Ability");
    }

    const data: Ability = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Ability:", error);
    return null;
  }
};

const getAbilityData = async (
  abilityUrl: string
): Promise<{ abilityName: string; abilityEffect: string } | null> => {
  const LANGUAGE = "en";
  const ability = await getAbility(abilityUrl);
  if (!ability) return null;

  const effectEntry = ability.effect_entries.find(
    (entry: EffectEntry) => entry.language.name === LANGUAGE
  );

  return {
    abilityName: ability.name,
    abilityEffect: effectEntry
      ? effectEntry.effect
      : "No effect description available.",
  };
};

export { getPokemonList, getPokemonInfo, getAbilityData };
