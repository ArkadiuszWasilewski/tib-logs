import PokemonInfo from "./CardContainer/PokemonInfo";
import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import SearchPokemon from "./CardContainer/SearchPokemon";
import usePokemonDetails from "../../hooks/usePokemonDetails";
import TypeFilter from "./CardContainer/TypeFilter";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";
import Tabs from "./CardContainer/Tabs";

const PokemonCardContainer = () => {
  const limit = 9;
  const [selectedType, setSelectedType] = useState(null);
  const [fullListOfPokemons, setFullListOfPokemons] = useState([]);

  const pokemonUrl = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=1302`; // Temporary limit
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

  const { detailedPokemonList, handleNextPage, handlePreviousPage } =
    usePokemonDetails(fetchedPokemonData, limit, selectedType);

  // Display loading placeholder
  if (loading) {
    return (
      <div className="mx-auto min-h-[1060px] flex items-center justify-center">
        <p>Loading...</p>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <p>Error loading data...</p>;
  }

  return (
    <div className="mx-auto mt-[100px]">
      {!loading && (
        <>
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
        </>
      )}
      <div className="grid grid-cols-3 gap-2 mt-10 max-w-[1000px]">
        {detailedPokemonList.map((pokemon) => (
          <PokemonInfo key={pokemon.name} pokemonInfo={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default PokemonCardContainer;
