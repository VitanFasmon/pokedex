import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { getPokemonList } from "./services/GetPokemonData";
import PokemonInfo from "./components/PokemonInfo";
import { PokemonNameAndUrl } from "./types/pokemonTypes";
import SelectPokemon from "./components/SelectPokemon";
function App() {
  const [selectedPokemonUrl, setSelectedPokemonUrl] = useState<string | null>(
    null
  );

  const handlePokemonSelect = (pokemon: PokemonNameAndUrl | null) => {
    if (pokemon) {
      setSelectedPokemonUrl(pokemon.url);
    } else {
      setSelectedPokemonUrl(null);
    }
  };

  return (
    <div className="App">
      <div className="p-p-4">
        <h1>Select a Pokémon</h1>
        <SelectPokemon onSelect={handlePokemonSelect} />

        {selectedPokemonUrl && (
          <div className="p-mt-4">
            <PokemonInfo pokemonUrl={selectedPokemonUrl} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
