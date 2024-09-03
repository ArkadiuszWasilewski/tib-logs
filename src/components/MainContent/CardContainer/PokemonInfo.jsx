import Tabs from "./Tabs";

const PokemonInfo = ({ pokemonInfo }) => {
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
      className={`flex flex-col justify-center text-gray-800 dark:text-white rounded-[25px]`}
      style={{
        backgroundImage: `linear-gradient(180deg, ${backgroundColorClass}, gray)`,
      }}
    >
      <div className="px-2 py-2">
        <img
          src={pokemonInfo.sprites.other["official-artwork"].front_default}
          alt={`${pokemonInfo.name} front default sprite`}
          className="max-w-[100px] m-auto"
        />
        <h2 className="capitalize font-bold">{pokemonInfo.name}</h2>
        <p>ID: {pokemonInfo.id}</p>
        <p>Weight: {pokemonInfo.weight}</p>
        <p>Height: {pokemonInfo.height}</p>
        <div>
          Types:
          {pokemonInfo.types.map((type) => (
            <span key={type.type.name}> {type.type.name} </span>
          ))}
        </div>
      </div>
      <div className="dark:bg-gray-800 dark:border-gray-600 dark:border-[2px] bg-white rounded-[25px] py-2 px-2 min-h-[250px]">
        <Tabs stats={pokemonInfo.stats} />
      </div>
    </div>
  ) : (
    <p>Pokémon not found!</p>
  );
};

export default PokemonInfo;
