import React, { useState } from "react";
import "./App.css";
import PokemonInfo from "./components/PokemonInfo";
import { PokemonNameAndUrl } from "./types/pokemonTypes";
import SelectPokemon from "./components/SelectPokemon";
import CustomizePokemon from "./components/CustomizePokemon";
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
          <div className="flex flex-col gap-4">
            <PokemonInfo pokemonUrl={selectedPokemonUrl} />
            <CustomizePokemon pokemonUrl={selectedPokemonUrl} />
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
