import { useEffect, useState } from "react";
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

  useEffect(() => {
    setCurrentGenerationIndex(0);
    setCurrentVersionIndex(0);
  }, [currentPokemonData]);

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
    <div className="flex h-fit gap-2">
      <button onClick={() => changeSpriteImage("previous")}>
        <i
          className="pi pi-caret-left text-orange-950"
          style={{ fontSize: "2rem" }}
        ></i>
      </button>
      <img
        alt="sprite image"
        src={getCurrentSprite()}
        className="w-24 h-24 object-contain"
      />

      <button onClick={() => changeSpriteImage("next")}>
        <i
          className="pi pi-caret-right text-orange-950"
          style={{ fontSize: "2rem" }}
        ></i>
      </button>
    </div>
  );
};

export default SpriteGallery;
