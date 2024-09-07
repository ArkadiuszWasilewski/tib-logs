import React, { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { typeColors } from "./typeColors";
import Spinner from "../../ui/Spinner";
import Tabs from "./Tabs";
import { usePokemonContext } from "../../../context/PokemonContext";

const PokemonCard = ({ pokemon }) => {
  const [currentPokemonData, setCurrentPokemonData] = useState(null);
  const { showModal, setShowModal } = usePokemonContext();
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
    return (
      <div>
        <p>Loading...</p>
        <Spinner />
      </div>
    );
  }

  if (errorPokemon) {
    return <p>Error loading Pokémon data.</p>;
  }

  if (!currentPokemonData) {
    return <p>No data available</p>;
  }

  const backgroundColorClass = currentPokemonData
    ? typeColors[currentPokemonData.types[0].type.name]
    : typeColors.default;

  return (
    <div
      className={`flex flex-col justify-center text-gray-800 dark:text-white rounded-[25px] shadow-xl mx-2 my-4`}
      style={{
        backgroundImage: `linear-gradient(180deg, ${backgroundColorClass}, gray)`,
      }}
    >
      <div className="px-2 py-2">
        <div className="capitalize font-bold text-4xl m-3 mt-4 text-center">
          {currentPokemonData.name}
        </div>
        <div className="flex">
          <span className="font-bold text-2xl ml-auto">
            #{Number(currentPokemonData.id).toString().padStart(3, "0")}
          </span>
        </div>
        <button onClick={() => setShowModal(true)}>
          <img
            src={
              currentPokemonData.sprites.other["official-artwork"].front_default
            }
            alt={`${currentPokemonData.name} front default sprite`}
            className="mx-auto relative bottom-[-20px]"
          />
        </button>
      </div>
      <div className="dark:bg-gray-800/[.3] bg-white/[.5] rounded-[25px] py-2 px-2 min-h-[230px]">
        <Tabs stats={currentPokemonData.stats} pokemon={currentPokemonData} />
      </div>
    </div>
  );
};

export default PokemonCard;
