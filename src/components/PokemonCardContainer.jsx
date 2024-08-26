import PokemonInfo from "./PokemonInfo";
import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import SearchPokemon from "./SearchPokemon";

const PokemonCardContainer = () => {
  const [offset, setOffset] = useState(0);
  const [detailedPokemonList, setDetailedPokemonList] = useState([]);
  const limit = 4;
  const pokemonUrl = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=1302`;

  const { data: fetchedPokemonData, loading, error } = useFetch(pokemonUrl);

  loading === false
    ? console.log("Fetched data: ", fetchedPokemonData)
    : console.log("Loading data...");

  useEffect(() => {
    const fetchDetailedPokemon = async () => {
      if (fetchedPokemonData) {
        const detailedData = await Promise.all(
          fetchedPokemonData.results
            .slice(offset, offset + limit)
            .map(async (pokemon) => {
              const response = await fetch(pokemon.url);
              return response.json();
            })
        );
        setDetailedPokemonList(detailedData);
      }
    };

    fetchDetailedPokemon();
  }, [fetchedPokemonData, offset]);

  console.log("Detailed data: ", detailedPokemonList);

  const handleNextPage = () => {
    setOffset((prevOffset) => prevOffset + limit);
  };

  const handlePreviousPage = () => {
    setOffset((prevOffset) => Math.max(prevOffset - limit, 0));
  };

  return (
    <>
      <div className="flex justify-center pb-8">
        <SearchPokemon data={detailedPokemonList} />
      </div>
      <div className="flex flex-wrap justify-center max-w-[700px]">
        {detailedPokemonList.map((pokemon) => (
          <PokemonInfo key={pokemon.name} pokemonInfo={pokemon} />
        ))}
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
        onClick={handlePreviousPage}
      >
        Previous Page
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
        onClick={handleNextPage}
      >
        Next page
      </button>
    </>
  );
};

export default PokemonCardContainer;
