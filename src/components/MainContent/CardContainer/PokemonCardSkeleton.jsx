import React from "react";
import Spinner from "../../ui/Spinner";

const PokemonCardSkeleton = () => {
  return (
    <div
      className={`flex w-[310px] h-[687px] justify-center items-center text-gray-800 dark:text-white rounded-[25px] shadow-xl mx-2 my-4  md:min-h-[667px] md:min-w-[312px]`}
    >
      <Spinner />
    </div>
  );
};

export default PokemonCardSkeleton;
