import { formattedDate } from "./formatedDate";
import formatTime from "./formatTime";

export const getSmartFormattedTime = (
  timestamp: string | Date | null
): string | undefined => {
  if (!timestamp) {
    return;
  }
  const date = new Date(timestamp);
  const now = new Date();
  const diffDays = (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);

  return diffDays > 7 ? formattedDate(timestamp) : formatTime(timestamp);
};
