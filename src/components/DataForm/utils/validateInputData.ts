import { FormState } from "../types";
import spawnLocations from "@/constants/spawnLocations"
import vocations from "@/constants/vocations";

// Validate data structere of uploaded JSON
export const validateDataStructure = (data: any): string | null => {
    const requiredFields = [
    "Balance",
    "Damage",
    "Damage/h",
    "Healing",
    "Healing/h",
    "Killed Monsters",
    "Loot",
    "Looted Items",
    "Raw XP Gain",
    "Raw XP/h",
    "Session end",
    "Session length",
    "Session start",
    "Supplies",
    "XP Gain",
    "XP/h",
  ];

  for (const field of requiredFields) {
    if (!data.hasOwnProperty(field)) {
      return `Missing required field: ${field}`;
    }
  }

  if (typeof data.Balance !== "number" || isNaN(data.Balance))
    return "Balance must be a valid number";
  if (typeof data.Damage !== "number" || isNaN(data.Damage))
    return "Damage must be a valid number";
  if (typeof data["Damage/h"] !== "number" || isNaN(data["Damage/h"]))
    return "Damage/h must be a valid number";
  if (typeof data.Healing !== "number" || isNaN(data.Healing))
    return "Healing must be a valid number";
  if (typeof data["Healing/h"] !== "number" || isNaN(data["Healing/h"]))
    return "Healing/h must be a valid number";
  if (!Array.isArray(data["Killed Monsters"]))
    return "Killed Monsters must be an array";
  if (!Array.isArray(data["Looted Items"]))
    return "Looted Items must be an array";
  if (typeof data["Raw XP Gain"] !== "number" || isNaN(data["Raw XP Gain"]))
    return "Raw XP Gain must be a valid number";
  if (typeof data["Raw XP/h"] !== "number" || isNaN(data["Raw XP/h"]))
    return "Raw XP/h must be a valid number";
  if (typeof data["Session end"] !== "string" || isNaN(Date.parse(data["Session end"])))
    return "Session end must be a valid date";
  if (typeof data["Session start"] !== "string" || isNaN(Date.parse(data["Session start"])))
    return "Session start must be a valid date";
  if (typeof data["Session length"] !== "string")
    return "Session length must be a valid string";
  if (typeof data.Supplies !== "number" || isNaN(data.Supplies))
    return "Supplies must be a valid number";
  if (typeof data["XP Gain"] !== "number" || isNaN(data["XP Gain"]))
    return "XP Gain must be a valid number";
  if (typeof data["XP/h"] !== "number" || isNaN(data["XP/h"]))
    return "XP/h must be a valid number";

  for (const monster of data["Killed Monsters"]) {
    if (!monster.Name || typeof monster.Count !== "number") {
      return "Each Killed Monster must have a Name and a Count (number)";
    }
  }
  for (const item of data["Looted Items"]) {
    if (!item.Name || typeof item.Count !== "number") {
      return "Each Looted Item must have a Name and a Count (number)";
    }
  }

  return null;
};


// Form fields validation
export const validateForm = (form: FormState): string | null => {
  if (form.dataSource === "file" && !form.selectedFile) {
    return "No JSON file selected";
  }
  if (form.dataSource === "text" && !form.tempTextInput) {
    return "No session data provided";
  }
  if (!form.characterVocation || !vocations.includes(form.characterVocation)) {
    return "Valid character vocation is required";
  }
  if (!form.characterLevel || isNaN(parseInt(form.characterLevel)) || parseInt(form.characterLevel) < 1) {
    return "Valid character level (positive number) is required";
  }
  if (!form.characterGear) {
    return "Character gear is required";
  }
  if (!form.currentSpawn || !spawnLocations.some((spawn) => spawn.spawnLocation === form.currentSpawn)) {
    return "Valid spawn location is required";
  }
  return null;
};

// Validation - filter out unrealistic and corrupted files
export const validateGameLogic = (data: any, form: FormState): string | null => {
  const sessionStart = new Date(data["Session start"]);
  const sessionEnd = new Date(data["Session end"]);
  const sessionLengthMs = sessionEnd.getTime() - sessionStart.getTime();

  // Check session data
  if (sessionEnd <= sessionStart) {
    return "Session end must be later than session start";
  }

  // Check session length
  const sessionLengthHours = sessionLengthMs / (1000 * 60 * 60);

  // Check if the amount of monsters is realistic
  const totalMonsters = data["Killed Monsters"].reduce(
    (sum: number, monster: any) => sum + monster.Count,
    0
  );
  if (totalMonsters / sessionLengthHours > 2000) {
    // Subject to change
    return "Unrealistic number of killed monsters per hour";
  }

  return null;
};