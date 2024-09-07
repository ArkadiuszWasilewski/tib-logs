import Pagination from "../ui/PaginationTab/Pagination";
import { useState } from "react";
import { usePokemonContext } from "../../context/PokemonContext";
import SearchBar from "../ui/Search/SearchBar";
import DropdownIcons from "../ui/TypeDropdown/DropdownIcons";
import SearchResults from "../ui/Search/SearchResults";
import PokemonCard from "./CardContainer/PokemonCard";
import ModalCard from "../ui/ModalCard";

const CardContainerContext = () => {
  const { filteredPokemon, currentPage, itemsPerPage } = usePokemonContext();
  const [showModal, setShowModal] = useState(false);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  // Slice the filteredPokemon array to show only the items for the current page
  const paginatedPokemon = filteredPokemon.slice(startIndex, endIndex);
  return (
    <div>
      <div className="m-auto max-w-[500px] md:mt-[140px] mt-[230px]">
        <SearchResults />
        <SearchBar />
        <DropdownIcons />
        <Pagination />
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1gap-2 max-w-[1000px] m-auto">
        {filteredPokemon
          ? paginatedPokemon.map((pokemon) => (
              <PokemonCard
                pokemon={pokemon}
                key={`${pokemon.name}-${pokemon.id}`}
              />
            ))
          : "error during generation pokemon list"}
      </div>
    </div>
  );
};

export default CardContainerContext;
