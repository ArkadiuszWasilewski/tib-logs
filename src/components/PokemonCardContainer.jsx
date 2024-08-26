import PokemonInfo from "./PokemonInfo";
import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import SearchPokemon from "./SearchPokemon";
import usePokemonDetails from "../hooks/usePokemonDetails";
import ButtonType from "./ButtonType";

const PokemonCardContainer = () => {
  const limit = 9;
  const pokemonUrl = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=1302`;
  const { data: fetchedPokemonData, loading, error } = useFetch(pokemonUrl);

  const [selectedType, setSelectedType] = useState(null);

  const { detailedPokemonList, handleNextPage, handlePreviousPage } =
    usePokemonDetails(fetchedPokemonData, limit, selectedType);

  if (loading) return <p>Loading Data...</p>;
  if (error) return <p>Error loading data...</p>;

  /*
      
*/

  return (
    <>
      <div className="flex items-center justify-around">
        <ButtonType setSelectedType={setSelectedType} />
        <SearchPokemon data={fetchedPokemonData.results} />
      </div>
      <div className="flex flex-wrap justify-center max-w-screen float-left">
        {detailedPokemonList.map((pokemon) => (
          <PokemonInfo key={pokemon.name} pokemonInfo={pokemon} />
        ))}
      </div>
      <div className="flex">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          onClick={handlePreviousPage}
        >
          Previous Page
        </button>
        <button
          className="float-left bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          onClick={handleNextPage}
        >
          Next page
        </button>
      </div>
    </>
  );
};

export default PokemonCardContainer;
