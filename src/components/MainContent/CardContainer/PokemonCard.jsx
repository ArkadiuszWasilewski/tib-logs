import React, { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { typeColors } from "./typeColors";
import Spinner from "../../ui/Spinner";
import Tabs from "./Tabs";
import { usePokemonContext } from "../../../context/PokemonContext";
import PokemonCardSkeleton from "./PokemonCardSkeleton";

const PokemonCard = ({ pokemon }) => {
  const [currentPokemonData, setCurrentPokemonData] = useState(null);
  const { setOpenModal, setSelectedPokemon } = usePokemonContext();

  const {
    data: fetchedPokemonData,
    loading: loadingPokemon,
    error: errorPokemon,
  } = useFetch(pokemon.url);

  useEffect(() => {
    if (fetchedPokemonData) {
      setCurrentPokemonData(fetchedPokemonData);
    }
  }, [fetchedPokemonData]);

  if (loadingPokemon) {
    return <PokemonCardSkeleton />;
  }

  if (errorPokemon) {
    return console.log("Error loading Pokémon data.");
  }

  if (!currentPokemonData) {
    return console.log("No data available");
  }

  const backgroundColorClass = currentPokemonData
    ? typeColors[currentPokemonData.types[0].type.name]
    : typeColors.default;

  const handleOpenModal = () => {
    setSelectedPokemon(pokemon); // Set the current Pokémon data
    setOpenModal(true); // Open the modal
  };

  return (
    <div
      className={`flex flex-col justify-between h-full text-gray-800 dark:text-white rounded-[25px] shadow-xl mx-2 my-4 md:min-h-[687px]`}
      style={{
        backgroundImage: `linear-gradient(180deg, ${backgroundColorClass}, gray)`,
      }}
    >
      <div className="flex flex-col justify-center px-2 py-2">
        <div className="flex capitalize font-bold text-4xl m-3 mt-4 text-center items-center">
          {currentPokemonData.name}
        </div>
        <div className="flex">
          <span className="font-bold text-2xl ml-auto">
            #{Number(currentPokemonData.id).toString().padStart(3, "0")}
          </span>
        </div>
        <button onClick={handleOpenModal}>
          <img
            src={
              currentPokemonData.sprites.other["official-artwork"].front_default
            }
            alt={`${currentPokemonData.name} front default sprite`}
            className="mx-auto relative bottom-[-20px]"
          />
        </button>
      </div>
      <div className="dark:bg-gray-800/[.3] bg-white/[.5] rounded-[25px] md:h-[250px]">
        <Tabs stats={currentPokemonData.stats} pokemon={currentPokemonData} />
      </div>
    </div>
  );
};

export default PokemonCard;
