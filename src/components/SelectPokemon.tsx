import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { PokemonNameAndUrl } from "../types/pokemonTypes";
import { getPokemonList } from "../services/GetPokemonData";
import { capitalizeFirstLetter } from "../services/CapitalizeFirstLetter";

interface SelectPokemonProps {
  onSelect: (pokemon: PokemonNameAndUrl | null) => void;
}

const SelectPokemon: React.FC<SelectPokemonProps> = ({ onSelect }) => {
  const [pokemonList, setPokemonList] = useState<PokemonNameAndUrl[]>([]);
  const [selectedPokemon, setSelectedPokemon] =
    useState<PokemonNameAndUrl | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      const list = await getPokemonList();
      setPokemonList(list);
    };
    fetchPokemon();
  }, []);

  const handleSelectPokemon = (pokemon: PokemonNameAndUrl | null) => {
    setSelectedPokemon(pokemon);
    onSelect(pokemon);
  };

  const handleRandomSelect = () => {
    if (pokemonList.length > 0) {
      const randomIndex = Math.floor(Math.random() * pokemonList.length);
      const randomPokemon = pokemonList[randomIndex];
      setSelectedPokemon(randomPokemon);
      onSelect(randomPokemon);
    }
  };

  return (
    <section className="flex justify-between gap-4 p-4">
      <Dropdown
        value={selectedPokemon}
        options={pokemonList}
        optionLabel="name"
        onChange={(e) => handleSelectPokemon(e.value)}
        placeholder="Select a Pokémon"
        filter
        showClear
        className="w-full placeholder-orange-800 bg-orange-100 border border-orange-950 text-orange-950 rounded"
        itemTemplate={(option) => (
          <div className="text-orange-950">
            <span>{capitalizeFirstLetter(option.name)}</span>
          </div>
        )}
      />
      <Button
        label="Random Pokemon"
        icon="pi pi-refresh "
        onClick={handleRandomSelect}
        className="p-button-success bg-orange-100 px-2 border border-orange-950 text-orange-950 rounded"
      />
    </section>
  );
};

export default SelectPokemon;
