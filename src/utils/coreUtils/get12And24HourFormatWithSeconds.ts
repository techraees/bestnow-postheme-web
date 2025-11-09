interface TimeObject {
  "12_hour_format": string;
  "24_hour_format": string;
}

/**
 * get12And24HourFormatWithSeconds: Utility Function used to get date in 12 and 24 time format with seconds
 * @param {Date} dateObj
 * @returns date string
 */
export function get12And24HourFormatWithSeconds(
  dateObj: string | Date
): TimeObject {
  const date = new Date(dateObj);

  // Calculate Pakistan Standard Time (UTC+5)
  const pakistanOffset = 5 * 60; // Offset in minutes
  const localTime = new Date(date.getTime() + pakistanOffset * 60 * 1000);

  // Extract hours, minutes, and seconds
  const hours24 = localTime.getUTCHours();
  const minutes = localTime.getUTCMinutes();
  const seconds = localTime.getUTCSeconds();

  // Convert to 12-hour format
  let hours12 = hours24 % 12 || 12; // Convert 0 to 12 for midnight
  const period = hours24 >= 12 ? "PM" : "AM";

  // Format time with leading zeros
  const time24 = `${hours24.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")} ${period}`;

  const time12 = `${hours12.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")} ${period}`;

  // Create the result object
  const timeObject: TimeObject = {
    "12_hour_format": time12,
    "24_hour_format": time24,
  };
  return timeObject;
}
