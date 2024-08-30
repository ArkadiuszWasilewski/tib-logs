import PokemonInfo from "./PokemonInfo";
import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import SearchPokemon from "./SearchPokemon";
import usePokemonDetails from "../hooks/usePokemonDetails";
import TypeFilter from "./TypeFilter";
import Button from "./Button";

const PokemonCardContainer = () => {
  const limit = 6;
  const [offset, setOffset] = useState(0);
  const [selectedType, setSelectedType] = useState(null);
  const [fullListOfPokemons, setFullListOfPokemons] = useState([]);

  const pokemonUrl = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=1302`; //temp limit
  const pokemonTypeUrl = `https://pokeapi.co/api/v2/type/`;

  const dynamicPokemonUrl = selectedType
    ? `${pokemonTypeUrl}${selectedType}`
    : pokemonUrl;

  const {
    data: fetchedPokemonData,
    loading,
    error,
  } = useFetch(dynamicPokemonUrl);

  // Effect to set full list of pokemons
  useEffect(() => {
    if (fetchedPokemonData?.results) {
      setFullListOfPokemons(fetchedPokemonData.results);
    }
  }, [fetchedPokemonData]); // Only run when fetchedPokemonData changes

  // Reset offset when selectedType changes
  useEffect(() => {
    setOffset(0);
  }, [selectedType]);

  const { detailedPokemonList, handleNextPage, handlePreviousPage } =
    usePokemonDetails(fetchedPokemonData, limit, selectedType);

  if (loading) return <p>Loading Data...</p>;
  // if (error) return <p>Error loading data...</p>;

  return (
    <div className="mx-auto">
      <TypeFilter
        selectedHighlight={selectedType}
        setSelectedType={setSelectedType}
      />
      <div className="mt-2 w-[300px] mx-auto">
        <SearchPokemon data={fullListOfPokemons} />
        <div className="flex w-[300px] space-x-1 mt-2">
          <Button onClick={handlePreviousPage}>Previous</Button>
          <Button onClick={handleNextPage}>Next</Button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 w-[650px]">
        {detailedPokemonList.map((pokemon) => (
          <PokemonInfo key={pokemon.name} pokemonInfo={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default PokemonCardContainer;
