import { THEME_DATA } from "../../data/coreData/coreData";

export const stringToColor = (str: string, theme_mode: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash % 360);
  const lightness = theme_mode === THEME_DATA.LIGHT ? "85%" : "35%";
  return `hsl(${hue}, 70%, ${lightness})`;
};
