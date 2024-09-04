import Tabs from "./Tabs";
import React from "react";

const PokemonInfo = ({ pokemonInfo, onClick }) => {
  const typeColors = {
    fire: "#f97316",
    water: "#38bdf8",
    grass: "#65a30d",
    normal: "#eff6ff",
    flying: "#fed7aa",
    poison: "#bef264",
    electric: "#fde047",
    ground: "#fde68a",
    rock: "#44403c",
    psychic: "#ec4899",
    ice: "#67e8f9",
    bug: "#84cc16",
    ghost: "#312e81",
    steel: "#a1a1aa",
    dragon: "#5b21b6",
    dark: "#111827",
    fairy: "#ec4899",
    fighting: "#ef4444",
    default: "grey",
  };
  const backgroundColorClass = pokemonInfo
    ? typeColors[pokemonInfo.types[0].type.name]
    : typeColors.default;

  return pokemonInfo ? (
    <div
      className={`flex flex-col justify-center text-gray-800 dark:text-white rounded-[25px] shadow-xl mx-2 my-4`}
      style={{
        backgroundImage: `linear-gradient(180deg, ${backgroundColorClass}, gray)`,
      }}
    >
      <div className="px-2 py-2">
        <button onClick={onClick}>
          <div className="capitalize font-bold text-4xl m-3 mt-4 text-center">
            {pokemonInfo.name}
          </div>
          <div className="flex">
            <span className="font-bold text-2xl ml-auto">
              #{Number(pokemonInfo.id).toString().padStart(3, "0")}
            </span>
          </div>

          <img
            src={pokemonInfo.sprites.other["official-artwork"].front_default}
            alt={`${pokemonInfo.name} front default sprite`}
            className="mx-auto relative bottom-[-20px]"
          />
        </button>
      </div>
      <div className="dark:bg-gray-800/[.3] bg-white/[.5] rounded-[25px] py-2 px-2 min-h-[230px]">
        <Tabs stats={pokemonInfo.stats} pokemon={pokemonInfo} />
      </div>
    </div>
  ) : (
    <p>Pokémon not found!</p>
  );
};

export default PokemonInfo;
