import { useState, useEffect } from "react";

const usePokemonDetails = (fetchedPokemonData, limit, selectedType) => {
    const [offset, setOffset] = useState(0);
    const [detailedPokemonList, setDetailedPokemonList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect( () => {
        const fetchDetailedPokemon = async () => {
          setLoading(true);
          try {
            if(fetchedPokemonData){
              
              if (selectedType === null) {
                const filteredResults = fetchedPokemonData.results;
                const detailedData = await Promise.all(
                  filteredResults
                    .slice(offset, offset + limit)
                    .map(async (pokemon) => {
                      const response = await fetch(pokemon.url);
                      return response.json();
                    })
                );
                setDetailedPokemonList(detailedData);
              } else {
                const filteredResults = fetchedPokemonData.pokemon;
                const detailedData = await Promise.all(
                  filteredResults
                    .slice(offset, offset + limit)
                    .map(async ({pokemon}) => {
                      const response = await fetch(pokemon.url);
                      return response.json();
                    })
                ); 
                setDetailedPokemonList(detailedData);
              }
            }
          } catch (err) {
            console.log("Error during loading...", err);
          } finally {
            setLoading(false);
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
    loading,
    handleNextPage,
    handlePreviousPage,
  }
}
export default usePokemonDetails;