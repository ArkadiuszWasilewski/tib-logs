import { useState, useEffect } from "react";

const usePokemonDetails = (fetchedPokemonData, limit, selectedType) => {

    const [offset, setOffset] = useState(0);
    const [detailedPokemonList, setDetailedPokemonList] = useState([]);

    useEffect( () => {
        const fetchDetailedPokemon = async () => {
          if (fetchedPokemonData) {
            let filteredResults = fetchedPokemonData.results;
        
            const detailedData = await Promise.all(
              filteredResults
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
  }, [fetchedPokemonData, offset, limit, selectedType]);

  const handleNextPage = () => {
    setOffset((prevOffset) => prevOffset + limit);
  };

  const handlePreviousPage = () => {
    setOffset((prevOffset) => Math.max(prevOffset - limit, 0));
  };

  return {
    detailedPokemonList,
    offset,
    handleNextPage,
    handlePreviousPage,
  }
}
export default usePokemonDetails;