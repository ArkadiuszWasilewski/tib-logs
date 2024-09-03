import React, { useState } from "react";

export default function Tabs({ stats = [] }) {
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
        return <div>About content here</div>;
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
      case "strong":
        return <div>Strong content</div>;
      case "weak":
        return <div>Weak content</div>;
    }
  };

  return (
    <div className="text-gray-600">
      <ul className="flex">
        <li className="me-2">
          <button
            onClick={() => setCurrentTab("about")}
            className={`inline-block p-4 ${
              currentTab === "about"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "border-transparent hover:text-gray-600 hover:border-gray-300"
            } rounded-t-lg font-bold`}
          >
            About
          </button>
        </li>
        <li className="me-2">
          <button
            onClick={() => setCurrentTab("stats")}
            className={`inline-block p-4 ${
              currentTab === "stats"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "border-transparent hover:text-gray-600 hover:border-gray-300"
            } rounded-t-lg font-bold`}
          >
            Stats
          </button>
        </li>
        <li className="me-2">
          <button
            onClick={() => setCurrentTab("strong")}
            className={`inline-block p-4 ${
              currentTab === "strong"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "border-transparent hover:text-gray-600 hover:border-gray-300"
            } rounded-t-lg font-bold`}
          >
            Strong
          </button>
        </li>
        <li className="me-2">
          <button
            onClick={() => setCurrentTab("weak")}
            className={`inline-block p-4 ${
              currentTab === "weak"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "border-transparent hover:text-gray-600 hover:border-gray-300"
            } rounded-t-lg font-bold`}
          >
            Strong
          </button>
        </li>
      </ul>
      <div>{renderTabContent()}</div>
    </div>
  );
}
