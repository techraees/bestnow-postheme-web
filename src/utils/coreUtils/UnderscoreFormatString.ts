export const UnderscoreFormatString = (str: string): string => {
  return str
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
export const UnderscoreFormatStringToDash = (str: string): string => {
  return str
    .toLowerCase() // Convert the entire string to lowercase
    .replace(/_/g, "-") // Replace underscores with hyphens
    .split("-") // Split the string by hyphens
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join("-"); // Join the words back with hyphens
};

export const toConvertDashVPower = (name: string): string => {
  return name.replace("V ", "V-");
};
