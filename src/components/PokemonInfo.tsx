// components/PokemonInfo.tsx
import { useEffect, useState } from "react";
import {
  getAbilityData,
  getPokemonInfo,
  getPokemonList,
} from "../services/GetPokemonData";
import { Pokemon, PokemonNameAndUrl } from "../types/pokemonTypes";
interface PokemonInfoProps {
  pokemonUrl: string;
}

const PokemonInfo = ({ pokemonUrl }: PokemonInfoProps) => {
  const [pokemonList, setPokemonList] = useState<PokemonNameAndUrl[]>([]);

  const [currentPokemonData, setCurrentPokemonData] = useState<Pokemon | null>(
    null
  );
  const [abilities, setAbilities] = useState<
    { abilityName: string; abilityEffect: string }[]
  >([]);
  const [loadingAbilities, setLoadingAbilities] = useState<boolean>(false);

  const getPokemonData = async () => {
    try {
      const list = await getPokemonList();
      setPokemonList(list);

      const pokemonData = await getPokemonInfo(pokemonUrl);
      if (pokemonData) {
        setCurrentPokemonData(pokemonData);
        fetchAbilities(pokemonData.abilities);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchAbilities = async (abilitiesArray: Pokemon["abilities"]) => {
    setLoadingAbilities(true);
    try {
      const abilitiesPromises = abilitiesArray.map((abilityItem) =>
        getAbilityData(abilityItem.ability.url)
      );

      const abilitiesResults = await Promise.all(abilitiesPromises);
      const validAbilities = abilitiesResults.filter(
        (ability): ability is { abilityName: string; abilityEffect: string } =>
          ability !== null
      );

      setAbilities(validAbilities);
    } catch (error) {
      console.error("Error fetching abilities:", error);
    } finally {
      setLoadingAbilities(false);
    }
  };

  useEffect(() => {
    getPokemonData();
  }, [pokemonUrl]);

  return (
    <section>
      <div>
        <h2>Current Pokémon Data:</h2>
        {currentPokemonData ? (
          <div>
            <p>
              <strong>Name:</strong>{" "}
              {capitalizeFirstLetter(currentPokemonData.name)}
            </p>
            <p>
              <strong>Height:</strong> {currentPokemonData.height}
            </p>
            <p>
              <strong>Weight:</strong> {currentPokemonData.weight}
            </p>
            <img
              src={currentPokemonData.sprites.front_default}
              alt={currentPokemonData.name}
            />
            <div>
              <h3>Abilities:</h3>
              {loadingAbilities ? (
                <p>Loading abilities...</p>
              ) : (
                <ul>
                  {abilities.map((ability, index) => (
                    <li key={index}>
                      <strong>
                        {capitalizeFirstLetter(ability.abilityName)}:
                      </strong>{" "}
                      {ability.abilityEffect}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ) : (
          <p>Loading Pokémon data...</p>
        )}
      </div>
    </section>
  );
};

const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export default PokemonInfo;
