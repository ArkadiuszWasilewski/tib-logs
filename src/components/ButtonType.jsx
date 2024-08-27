import React from "react";
import { useState } from "react";
import fireIcon from "../assets/types/fire.svg";
import waterIcon from "../assets/types/water.svg";
import bugIcon from "../assets/types/bug.svg";
import darkIcon from "../assets/types/dark.svg";
import dragonIcon from "../assets/types/dragon.svg";
import electricIcon from "../assets/types/electric.svg";
import fairyIcon from "../assets/types/fairy.svg";
import fightingIcon from "../assets/types/fighting.svg";
import flyingIcon from "../assets/types/flying.svg";
import ghostIcon from "../assets/types/ghost.svg";
import grassIcon from "../assets/types/grass.svg";
import groundIcon from "../assets/types/ground.svg";
import iceIcon from "../assets/types/ice.svg";
import normalIcon from "../assets/types/normal.svg";
import poisonIcon from "../assets/types/poison.svg";
import psychicIcon from "../assets/types/psychic.svg";
import rockIcon from "../assets/types/rock.svg";
import steelIcon from "../assets/types/steel.svg";

const ButtonType = ({ setSelectedType, selectedHighlight }) => {
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
    <div className="max-w-[300px] max-h-[120px] max-sm:float-left">
      <ul>
        {Object.keys(pokemonTypeIcon).map((type) => (
          <li className="inline-block" key={type}>
            <button onClick={() => setSelectedType(type)}>
              <img
                className={` ${
                  selectedHighlight === type
                    ? "w-[50px] h-[50px]"
                    : "w-[30px] h-[30px]"
                }`}
                title={type}
                src={pokemonTypeIcon[type]}
                alt={`${type} icon`}
              />
            </button>
          </li>
        ))}
      </ul>
      <div className="flex justify-center">
        <button
          onClick={() => setSelectedType(null)}
          className="m-2 bg-red-500 text-white py-1 px-2 rounded"
        >
          Clear Filter
        </button>
      </div>
    </div>
  );
};

export default ButtonType;
