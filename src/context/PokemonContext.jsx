//It's not used anywhere yet, I still don't get the "context" idea

import React, { createContext, useContext, useState } from "react";

const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
  const [selectedType, setSelectedType] = useState(null);
  const [offset, setOffset] = useState(0);
  const limit = 9;

  const handleNextPage = () => setOffset((prev) => prev + limit);
  const handlePreviousPage = () =>
    setOffset((prev) => Math.max(prev - limit, 0));

  return (
    <PokemonContext.Provider
      value={{
        selectedType,
        setSelectedType,
        offset,
        limit,
        handleNextPage,
        handlePreviousPage,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemon = () => useContext(PokemonContext);
