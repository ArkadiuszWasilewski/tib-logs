export const convertCommaSeparatedToNumber = (value: string): number => {
  return parseFloat(value.replace(/,/g, ""));
};

export const formatSessionDataNumbers = (data: any): any => {
  const fieldsToConvert = [
    "Balance",
    "Damage",
    "Damage/h",
    "Healing",
    "Healing/h",
    "Loot",
    "Raw XP Gain",
    "Raw XP/h",
    "Supplies",
    "XP Gain",
    "XP/h",
  ];

  const formattedData = { ...data };
  for (const field of fieldsToConvert) {
    if (formattedData[field]) {
      formattedData[field] = convertCommaSeparatedToNumber(formattedData[field]);
    }
  }

  return formattedData;
};