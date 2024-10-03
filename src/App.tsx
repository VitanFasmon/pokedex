import React, { useState } from "react";
import "./App.css";
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
    <div className="App bg-orange-50 h-full">
      <section className="p-p-4">
        <SelectPokemon onSelect={handlePokemonSelect} />

        {selectedPokemonUrl && (
          <div className="p-mt-4">
            <PokemonInfo pokemonUrl={selectedPokemonUrl} />
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
