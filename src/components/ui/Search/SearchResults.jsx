import React, { useContext } from "react";
import { usePokemonContext } from "../../../context/PokemonContext";

const SearchResults = ({}) => {
  const { countResults, searchTerm, selectedType } = usePokemonContext();

  return (
    <div className="flex justify-center dark:text-white text-black">
      {countResults > 0 ? (
        <p>
          Found {countResults} results{" "}
          {searchTerm && selectedType === null
            ? `for phrase "${searchTerm}"`
            : `for type ${selectedType}`}
        </p>
      ) : (
        <p>No results found for "{searchTerm}"</p>
      )}
    </div>
  );
};

export default SearchResults;
