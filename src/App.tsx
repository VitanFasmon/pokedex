import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { getPokemonList } from "./services/GetPokemonData";
import PokemonInfo from "./components/PokemonInfo";
function App() {
  return (
    <div className="App">
      <PokemonInfo />
    </div>
  );
}

export default App;
