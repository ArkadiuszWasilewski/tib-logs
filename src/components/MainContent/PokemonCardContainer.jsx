import PokemonInfo from "./CardContainer/PokemonInfo";
import React, { useState, useEffect, useRef } from "react";
import useFetch from "../../hooks/useFetch";
import SearchPokemon from "./CardContainer/SearchPokemon";
import usePokemonDetails from "../../hooks/usePokemonDetails";
import TypeFilter from "./CardContainer/TypeFilter";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";
import ModalCard from "../ui/ModalCard";
import Pagination from "../ui/PaginationTab/Pagination";

const PokemonCardContainer = () => {
  const limit = 9;
  const [selectedType, setSelectedType] = useState(null);
  const [fullListOfPokemons, setFullListOfPokemons] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const pokemonUrl = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=1302`;
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
      console.log("Fetched Pokémon Data:", fetchedPokemonData);
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

  const handleCardClick = (pokemon) => {
    console.log("Card clicked:", pokemon);
    setSelectedPokemon(pokemon);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    console.log("Modal closed"); // Debugging log
    setSelectedPokemon(null); // Clear the selected Pokémon
    setShowModal(false); // Hide the modal
  };
  const handleSearchResult = (pokemon) => {
    if (pokemon) {
      console.log("Searched: ", pokemon);
      setSelectedPokemon(pokemon);
      setShowModal(true);
    } else {
      alert("Pokémon not found!");
      setSelectedPokemon(null); // Ensure state is cleared
    }
  };

  return (
    <div className="m-auto md:mt-[140px] mt-[240px]">
      {!loading && (
        <div className="flex">
          <TypeFilter
            selectedHighlight={selectedType}
            setSelectedType={setSelectedType}
          />
          <div className="mt-2 w-[300px] mx-auto">
            <SearchPokemon
              data={fullListOfPokemons}
              onSearchResult={handleSearchResult}
            />
            <div className="flex w-[300px] space-x-1 mt-2">
              <Button onClick={handlePreviousPage}>Previous</Button>
              <Button onClick={handleNextPage}>Next</Button>
            </div>
          </div>
        </div>
      )}
      <Pagination />
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1gap-2 mt-10 max-w-[1000px] ">
        {detailedPokemonList.map((pokemon) => (
          <PokemonInfo
            key={pokemon.name}
            pokemonInfo={pokemon}
            onClick={() => handleCardClick(pokemon)}
          />
        ))}
      </div>
      {/* Modal */}
      {showModal && selectedPokemon && (
        <ModalCard onClose={handleCloseModal}>
          <PokemonInfo pokemonInfo={selectedPokemon} />
        </ModalCard>
      )}
    </div>
  );
};

export default PokemonCardContainer;
