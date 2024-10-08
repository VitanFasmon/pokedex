import { useEffect, useState } from "react";
import {
  getAbilityData,
  getPokemonInfo,
  getPokemonList,
} from "../services/GetPokemonData";
import { Pokemon, PokemonNameAndUrl } from "../types/pokemonTypes";
import { capitalizeFirstLetter } from "../services/CapitalizeFirstLetter";
import weightImg from "../assets/icons/weight.png";
import heightBarImg from "../assets/icons/heightBar.png";
import SpriteGallery from "./SpriteGallery";
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
      {currentPokemonData ? (
        <div className="flex justify-between flex-wrap">
          <div className="flex flex-row md:w-1/2 flex-wrap sm:justify-center sm:gap-4">
            <div className="flex flex-row ">
              <div className="flex flex-row ">
                <div className="flex items-center w-full">
                  <img alt="" src={heightBarImg} className="h-full "></img>
                  <p className="text-orange-950 ">
                    {`${currentPokemonData.height} cm`}
                  </p>
                </div>
                <div className="w-full">
                  <div className="relative inline-block">
                    <img src={weightImg} className="h-16 w-16" alt="" />
                    <p className="absolute inset-0 flex items-center justify-center text-center text-xs top-5 text-orange-950">
                      {currentPokemonData.weight} kg
                    </p>
                  </div>
                </div>
              </div>
              <img
                className="object-scale-down  h-96"
                src={
                  currentPokemonData.sprites.other["official-artwork"]
                    .front_default
                }
                alt={currentPokemonData.name}
              />
            </div>
            <div className="flex justify-center items-end ">
              <SpriteGallery currentPokemonData={currentPokemonData} />
            </div>
          </div>
          <div className="flex flex-col items-start gap-2 px-4 md:w-1/2">
            <h1 className="text-orange-950 text-4xl">
              {capitalizeFirstLetter(currentPokemonData.name)}
            </h1>
            <div className="flex gap-2">
              {currentPokemonData.types.map((pokemonType) => {
                return (
                  <span className="border border-orange-950 p-1 bg-orange-100 rounded">
                    {pokemonType.type.name}
                  </span>
                );
              })}
            </div>
            <div className="flex border border-orange-950 rounded py-2 px-4 h-full text-orange-950 text-left gap-2 flex-col max-h-72 overflow-auto	">
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
        </div>
      ) : (
        <p>Loading Pokémon data...</p>
      )}
    </section>
  );
};

export default PokemonInfo;
