import React from "react";
import fireIcon from "../../../assets/types/fire.svg";
import waterIcon from "../../../assets/types/water.svg";
import bugIcon from "../../../assets/types/bug.svg";
import darkIcon from "../../../assets/types/dark.svg";
import dragonIcon from "../../../assets/types/dragon.svg";
import electricIcon from "../../../assets/types/electric.svg";
import fairyIcon from "../../../assets/types/fairy.svg";
import fightingIcon from "../../../assets/types/fighting.svg";
import flyingIcon from "../../../assets/types/flying.svg";
import ghostIcon from "../../../assets/types/ghost.svg";
import grassIcon from "../../../assets/types/grass.svg";
import groundIcon from "../../../assets/types/ground.svg";
import iceIcon from "../../../assets/types/ice.svg";
import normalIcon from "../../../assets/types/normal.svg";
import poisonIcon from "../../../assets/types/poison.svg";
import psychicIcon from "../../../assets/types/psychic.svg";
import rockIcon from "../../../assets/types/rock.svg";
import steelIcon from "../../../assets/types/steel.svg";
import Button from "../../ui/Button";

const TypeFilter = ({ setSelectedType, selectedHighlight }) => {
  const pokemonTypeIcon = {
    fire: fireIcon,
    water: waterIcon,
    bug: bugIcon,
    dark: darkIcon,
    dragon: dragonIcon,
    electric: electricIcon,
    fairy: fairyIcon,
    fighting: fightingIcon,
    flying: flyingIcon,
    ghost: ghostIcon,
    grass: grassIcon,
    ground: groundIcon,
    ice: iceIcon,
    normal: normalIcon,
    poison: poisonIcon,
    psychic: psychicIcon,
    rock: rockIcon,
    steel: steelIcon,
  };

  return (
    <div className="inline max-w-[700px]">
      <div className="flex items-center flex-wrap">
        {Object.keys(pokemonTypeIcon).map((type) => (
          <button onClick={() => setSelectedType(type)} key={type}>
            <img
              className={` ${
                selectedHighlight === type
                  ? "min-w-[50px] min-h-[50px] m-[2px]"
                  : "min-w-[40px] min-h-[40px] m-[6px]"
              }`}
              title={type}
              src={pokemonTypeIcon[type]}
              alt={`${type} icon`}
            />
          </button>
        ))}
      </div>
      <Button
        onClick={() => setSelectedType(null)}
        custom="max-w-[80px] max-h-[50px]"
      >
        Clear type
      </Button>
    </div>
  );
};

export default TypeFilter;
