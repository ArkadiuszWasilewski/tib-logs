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
              let filteredResults = fetchedPokemonData.results;
              let tempList = []
              if (selectedType === null) {
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
                for (let i = 0; i<filteredResults.length; i++) {
                  const pokemon = filteredResults[i];
                  const response = await fetch(pokemon.url);
                  const data = await response.json();
                  if (data.types.some(typeInfo => typeInfo.type.name === selectedType)) {
                    tempList.push(data);
                  }
  
                }
                setDetailedPokemonList(tempList);
              }
            }
          } catch {
            console.log("Error during loading...", err);
          } finally {
            setLoading(false);
          }

          loading ? console.log("loading...") : console.log("Loaded");
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