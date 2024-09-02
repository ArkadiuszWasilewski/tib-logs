import React from "react";

const PokemonInfoTable = ({ stats = [] }) => {
  const statsLabels = [
    { key: "hp", label: "HP" },
    { key: "attack", label: "Attack" },
    { key: "defense", label: "Defense" },
    { key: "special-attack", label: "Sp. Attack" },
    { key: "special-defense", label: "Sp. Defense" },
    { key: "speed", label: "Speed" },
  ];

  return (
    <table className="table-auto">
      <thead>
        <tr>
          <th scope="col">Base</th>
          <th scope="col">Stats</th>
        </tr>
      </thead>
      <tbody>
        {statsLabels.map(({ key, label }) => {
          const stat = stats.find((s) => s.stat.name === key);
          return (
            <tr key={key}>
              <td>{label}:</td>
              <td>{stat ? stat.base_stat : "-"}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default PokemonInfoTable;
