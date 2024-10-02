import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme
import "primereact/resources/primereact.min.css"; // core css
import "primeicons/primeicons.css"; // icons
import "primeflex/primeflex.css"; // flex utilities

import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { PokemonNameAndUrl } from "../types/pokemonTypes";
import { getPokemonList } from "../services/GetPokemonData";

interface SelectPokemonProps {
  onSelect: (pokemon: PokemonNameAndUrl | null) => void;
}

const SelectPokemon: React.FC<SelectPokemonProps> = ({ onSelect }) => {
  const [pokemonList, setPokemonList] = useState<PokemonNameAndUrl[]>([]);
  const [selectedPokemon, setSelectedPokemon] =
    useState<PokemonNameAndUrl | null>(null);

  // Fetch the Pokémon list when the component mounts
  useEffect(() => {
    const fetchPokemon = async () => {
      const list = await getPokemonList();
      setPokemonList(list);
    };
    fetchPokemon();
  }, []);

  // Handle Pokémon selection from dropdown
  const handleSelectPokemon = (pokemon: PokemonNameAndUrl | null) => {
    setSelectedPokemon(pokemon);
    onSelect(pokemon);
  };

  // Pick a random Pokémon from the list
  const handleRandomSelect = () => {
    if (pokemonList.length > 0) {
      const randomIndex = Math.floor(Math.random() * pokemonList.length);
      const randomPokemon = pokemonList[randomIndex];
      setSelectedPokemon(randomPokemon);
      onSelect(randomPokemon);
    }
  };

  return (
    <div className="p-d-flex p-ai-center">
      <Dropdown
        value={selectedPokemon}
        options={pokemonList}
        optionLabel="name"
        onChange={(e) => handleSelectPokemon(e.value)}
        placeholder="Select a Pokémon"
        filter
        showClear
        className="p-mr-2"
        style={{ width: "250px" }}
        itemTemplate={(option) => (
          <div className="p-d-flex p-ai-center">
            <span>{option.name}</span>
          </div>
        )}
      />
      <Button
        label="Random Pokémon"
        icon="pi pi-refresh"
        onClick={handleRandomSelect}
        className="p-button-success"
      />
    </div>
  );
};

export default SelectPokemon;
