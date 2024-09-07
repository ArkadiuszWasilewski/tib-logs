import Pagination from "../ui/PaginationTab/Pagination";
import { usePokemonContext } from "../../context/PokemonContext";
import SearchBar from "../ui/Search/SearchBar";
import DropdownIcons from "../ui/TypeDropdown/DropdownIcons";
import SearchResults from "../ui/Search/SearchResults";
import PokemonCard from "./CardContainer/PokemonCard";
import ModalCard from "../ui/ModalCard";

const CardContainerContext = () => {
  const {
    filteredPokemon,
    currentPage,
    itemsPerPage,
    selectedPokemon,
    openModal,
    setOpenModal,
  } = usePokemonContext();

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  // Slice the filteredPokemon array to show only the items for the current page
  const paginatedPokemon = filteredPokemon.slice(startIndex, endIndex);

  // Determine the number of columns based on the number of paginated results
  const gridColumnsClass =
    paginatedPokemon.length === 1
      ? "grid-cols-1"
      : paginatedPokemon.length === 2
      ? "grid-cols-2"
      : "grid-cols-3";

  return (
    <div>
      <div className="m-auto max-w-[500px] md:mt-[140px] mt-[230px]">
        <SearchResults />
        <SearchBar />
        <DropdownIcons />
        <Pagination />
      </div>
      {/* Flex container to center the cards */}
      <div className="flex justify-center items-center">
        {/* Inner grid container for displaying Pokémon cards */}
        <div
          className={`grid ${gridColumnsClass} lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-2 max-w-[1000px] m-auto min-h-[641px]`}
        >
          {paginatedPokemon.length > 0 ? (
            paginatedPokemon.map((pokemon) => (
              <PokemonCard
                pokemon={pokemon}
                key={`${pokemon.name}-${pokemon.id}`}
              />
            ))
          ) : (
            <p>No Pokémon found or error during generation</p>
          )}
        </div>
      </div>
      {openModal ? (
        <ModalCard onClose={() => setOpenModal(false)}>
          {selectedPokemon ? (
            <PokemonCard pokemon={selectedPokemon} />
          ) : (
            <p>No Pokémon selected</p>
          )}
        </ModalCard>
      ) : null}
    </div>
  );
};

export default CardContainerContext;
