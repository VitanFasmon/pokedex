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
const getPokemonInfo = async (POKEMON_URL: string) => {
  try {
    const response = await fetch(POKEMON_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch Pokémon");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    return null;
  }
};
const getAbility = async (ABILITY_URL: string) => {
  try {
    const response = await fetch(ABILITY_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch Ability");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Ability:", error);
    return null;
  }
};
export { getPokemonList, getPokemonInfo, getAbility };
