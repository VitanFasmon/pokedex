import { useState } from "react";
import { Pokemon, SpriteVersions } from "../types/pokemonTypes";

interface SpriteGalleryProps {
  currentPokemonData: Pokemon | null;
}

const SpriteGallery = ({ currentPokemonData }: SpriteGalleryProps) => {
  const generations = currentPokemonData
    ? (Object.keys(currentPokemonData.sprites.versions) as Array<
        keyof SpriteVersions
      >)
    : [];

  const versionsPerGeneration = generations.map((generation) =>
    currentPokemonData
      ? Object.keys(currentPokemonData.sprites.versions[generation])
      : []
  );

  const [currentGenerationIndex, setCurrentGenerationIndex] = useState(0);
  const [currentVersionIndex, setCurrentVersionIndex] = useState(0);

  const getCurrentSprite = () => {
    if (!currentPokemonData) return "";

    const currentGeneration = generations[currentGenerationIndex];
    const versionKeys = versionsPerGeneration[currentGenerationIndex];

    if (!versionKeys || versionKeys.length === 0) return "";

    const currentVersionKey = versionKeys[
      currentVersionIndex
    ] as keyof SpriteVersions[typeof currentGeneration];

    return (
      (
        currentPokemonData.sprites.versions[currentGeneration][
          currentVersionKey
        ] as { front_default: string }
      ).front_default || ""
    );
  };

  const changeSpriteImage = (direction: "next" | "previous") => {
    if (direction === "next") {
      if (
        currentVersionIndex <
        versionsPerGeneration[currentGenerationIndex].length - 1
      ) {
        setCurrentVersionIndex(currentVersionIndex + 1);
      } else if (currentGenerationIndex < generations.length - 1) {
        setCurrentGenerationIndex(currentGenerationIndex + 1);
        setCurrentVersionIndex(0);
      }
    } else if (direction === "previous") {
      if (currentVersionIndex > 0) {
        setCurrentVersionIndex(currentVersionIndex - 1);
      } else if (currentGenerationIndex > 0) {
        setCurrentGenerationIndex(currentGenerationIndex - 1);
        setCurrentVersionIndex(
          versionsPerGeneration[currentGenerationIndex - 1].length - 1
        );
      }
    }
  };

  return (
    <div className="flex h-fit">
      <button onClick={() => changeSpriteImage("previous")}>previous</button>
      <div className="flex flex-col">
        <img
          alt="sprite image"
          src={getCurrentSprite()}
          className="w-44 h-44 object-contain"
        />
        <p>{generations[currentGenerationIndex]}</p>
        <p>{versionsPerGeneration[currentGenerationIndex]}</p>
      </div>

      <button onClick={() => changeSpriteImage("next")}>next</button>
    </div>
  );
};

export default SpriteGallery;
