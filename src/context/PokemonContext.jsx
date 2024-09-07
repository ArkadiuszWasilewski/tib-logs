import React, { useContext, useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import Spinner from "../components/ui/Spinner";

const PokemonContext = React.createContext();

export const usePokemonContext = () => {
  return useContext(PokemonContext);
};

const pokemonUrl = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=1302`;
const pokemonTypeUrl = `https://pokeapi.co/api/v2/type/`;

export const PokemonContextProvider = ({ children }) => {
  const [allPokemon, setAllPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [selectedType, setSelectedType] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [allPokemonType, setAllPokemonType] = useState([]);
  const [countResults, setCountResults] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [closeModal, setCloseModal] = useState(false);

  const {
    data: fetchedAllPokemonData,
    loading: loadingPokemon,
    error: errorPokemon,
  } = useFetch(pokemonUrl);

  useEffect(() => {
    if (fetchedAllPokemonData?.results) {
      setAllPokemon(fetchedAllPokemonData.results);
      setFilteredPokemon(fetchedAllPokemonData.results);
      setCountResults(fetchedAllPokemonData.results.length);
      setCurrentPage(1);
    }
  }, [fetchedAllPokemonData]);

  // Filtering through allPokemon
  useEffect(() => {
    if (searchTerm) {
      const filtered = allPokemon.filter(
        (pokemon) => {
          const nameMatches = pokemon.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

          const urlSegments = pokemon.url.split("/");
          const id = urlSegments[urlSegments.length - 2];
          const idMatches = id === searchTerm;
          return nameMatches || idMatches;
        }
        // Add more filter conditions here if needed
      );
      setCurrentPage(1);
      setSelectedType(null);
      setFilteredPokemon(filtered);
      setCountResults(filtered.length);
    } else {
      setFilteredPokemon(allPokemon);
      setCountResults(allPokemon.length);
    }
  }, [searchTerm, allPokemon]);

  const {
    data: fetchedAllPokemonTypeData,
    loading: loadingType,
    error: errorType,
  } = useFetch(selectedType ? `${pokemonTypeUrl}${selectedType}` : null);

  useEffect(() => {
    if (selectedType && fetchedAllPokemonTypeData?.pokemon) {
      const pokemonData = fetchedAllPokemonTypeData.pokemon.map((poke) => ({
        name: poke.pokemon.name,
        url: poke.pokemon.url,
      }));
      setFilteredPokemon(pokemonData);
      setCountResults(pokemonData.length);
      setCurrentPage(1);
    } else if (!selectedType) {
      // Reset to show all Pokémon when type is cleared
      setFilteredPokemon(allPokemon);
      setCountResults(allPokemon.length);
      setCurrentPage(1); // Reset to the first page
    }
  }, [fetchedAllPokemonTypeData, selectedType, allPokemon]);

  if (loadingPokemon || loadingType) {
    console.log("Loading...");
    return (
      <div className="mt-[200px]">
        <Spinner />
        <p>Loading...</p>
      </div>
    );
  }

  if (errorPokemon || errorType) {
    console.log("Error: ", errorPokemon?.message || errorType?.message);
    return (
      <div className="mt-[200px]">
        Error: {errorPokemon?.message || errorType?.message}
      </div>
    );
  }

  const value = {
    allPokemon,
    allPokemonType,
    filteredPokemon,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    selectedType,
    setSelectedType,
    setFilteredPokemon,
    searchTerm,
    setSearchTerm,
    countResults,
    selectedPokemon,
    setSelectedPokemon,
    openModal,
    setOpenModal,
    closeModal,
  };

  return (
    <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>
  );
};
