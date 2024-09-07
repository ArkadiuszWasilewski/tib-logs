import React from "react";
import HeroSection from "./MainContent/HeroSection";
import CardContainerContext from "./MainContent/CardContainerContext";
import { PokemonContextProvider } from "../context/PokemonContext";

export default function MainContent() {
  return (
    <>
      {/* <HeroSection /> */}
      {/* <PokemonCardContainer /> */}
      <PokemonContextProvider>
        <CardContainerContext />
      </PokemonContextProvider>
    </>
  );
}
