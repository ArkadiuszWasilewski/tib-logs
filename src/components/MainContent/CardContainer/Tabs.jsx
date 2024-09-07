import React, { useState } from "react";
import ButtonTabs from "../../ui/ButtonTabs";
import icons from "../../../assets/types/icons";

export default function Tabs({ stats = [], pokemon }) {
  const [currentTab, setCurrentTab] = useState("about");
  const statsLabels = [
    { key: "hp", label: "HP" },
    { key: "attack", label: "Attack" },
    { key: "defense", label: "Defense" },
    { key: "special-attack", label: "Sp. Attack" },
    { key: "special-defense", label: "Sp. Defense" },
    { key: "speed", label: "Speed" },
  ];

  const renderTabContent = () => {
    switch (currentTab) {
      case "about":
        return (
          <div>
            <p>Weight: {pokemon.weight / 10} kg</p>
            <p>Height: {pokemon.height / 10} m</p>
            <p>Types:</p>
            {pokemon.types.map((type) => (
              <div key={type.type.name} className="inline">
                {/* <span key={type.type.name}> {type.type.name} </span> */}
                <img
                  className="max-w-[50px] inline p-1"
                  title={type.type.name}
                  src={icons[type.type.name]}
                  alt={`${type.type.name} icon`}
                />
              </div>
            ))}
          </div>
        );
      case "stats":
        return (
          <div>
            <table className="table-auto">
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
          </div>
        );
    }
  };

  return (
    <div className="text-gray-600 dark:text-gray-100">
      <ul className="flex">
        {["about", "stats"].map((tab) => (
          <li key={tab} className="m-auto">
            <ButtonTabs
              label={tab.charAt(0).toUpperCase() + tab.slice(1)} // Capitalize first letter
              isActive={currentTab === tab}
              onClick={() => setCurrentTab(tab)}
            />
          </li>
        ))}
      </ul>
      <div>{renderTabContent()}</div>
    </div>
  );
}
