import { convertCommaSeparatedToNumber } from "./formatData";

export const parseTextData = (text: string): any => {
  const lines = text.split("\n").map((line) => line.trim()).filter((line) => line);
  const result: any = {
    "Killed Monsters": [],
    "Looted Items": [],
  };

  let currentSection: string | null = null;

  for (const line of lines) {
    if (line.startsWith("Session data:")) {
      const [start, end] = line.replace("Session data: From ", "").split(" to ");
      result["Session start"] = start.trim();
      result["Session end"] = end.trim();
    } else if (line.startsWith("Session:")) {
      result["Session length"] = line.replace("Session: ", "").trim();
    } else if (line.startsWith("Raw XP Gain:")) {
      result["Raw XP Gain"] = convertCommaSeparatedToNumber(line.replace("Raw XP Gain: ", "").trim());
    } else if (line.startsWith("XP Gain:")) {
      result["XP Gain"] = convertCommaSeparatedToNumber(line.replace("XP Gain: ", "").trim());
    } else if (line.startsWith("Raw XP/h:")) {
      result["Raw XP/h"] = convertCommaSeparatedToNumber(line.replace("Raw XP/h: ", "").trim());
    } else if (line.startsWith("XP/h:")) {
      result["XP/h"] = convertCommaSeparatedToNumber(line.replace("XP/h: ", "").trim());
    } else if (line.startsWith("Loot:")) {
      result["Loot"] = convertCommaSeparatedToNumber(line.replace("Loot: ", "").trim());
    } else if (line.startsWith("Supplies:")) {
      result["Supplies"] = convertCommaSeparatedToNumber(line.replace("Supplies: ", "").trim());
    } else if (line.startsWith("Balance:")) {
      result["Balance"] = convertCommaSeparatedToNumber(line.replace("Balance: ", "").trim());
    } else if (line.startsWith("Damage:")) {
      result["Damage"] = convertCommaSeparatedToNumber(line.replace("Damage: ", "").trim());
    } else if (line.startsWith("Damage/h:")) {
      result["Damage/h"] = convertCommaSeparatedToNumber(line.replace("Damage/h: ", "").trim());
    } else if (line.startsWith("Healing:")) {
      result["Healing"] = convertCommaSeparatedToNumber(line.replace("Healing: ", "").trim());
    } else if (line.startsWith("Healing/h:")) {
      result["Healing/h"] = convertCommaSeparatedToNumber(line.replace("Healing/h: ", "").trim());
    } else if (line.startsWith("Killed Monsters:")) {
      currentSection = "Killed Monsters";
    } else if (line.startsWith("Looted Items:")) {
      currentSection = "Looted Items";
    } else if (currentSection === "Killed Monsters" && line.includes("x")) {
      const [count, name] = line.split("x").map((part) => part.trim());
      result["Killed Monsters"].push({
        Count: parseInt(count),
        Name: name,
      });
    } else if (currentSection === "Looted Items" && line.includes("x")) {
      const [count, name] = line.split("x").map((part) => part.trim());
      result["Looted Items"].push({
        Count: parseInt(count),
        Name: name,
      });
    }
  }

  return result;
};