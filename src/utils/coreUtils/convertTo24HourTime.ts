function convertTo24HourTime(
  hour: number | string,
  minute: number | string,
  meridiem: string | "AM" | "PM"
): string {
  hour = Number(hour);
  minute = Number(minute);
  meridiem = String(meridiem).toUpperCase(); // Convert meridiem to string and make it uppercase

  // Validate inputs
  if (typeof hour !== "number" || hour < 1 || hour > 12) {
    throw new Error("Invalid hour. Hour should be a number between 1 and 12.");
  }
  if (typeof minute !== "number" || minute < 0 || minute > 59) {
    throw new Error(
      "Invalid minute. Minute should be a number between 00 and 59."
    );
  }
  if (meridiem !== "AM" && meridiem !== "PM") {
    throw new Error("Invalid meridiem. Should be either 'AM' or 'PM'.");
  }

  // Format hour and minute as two digits
  const formattedMinute = minute.toString().padStart(2, "0");

  // Adjust hour for AM/PM if needed (12-hour to 24-hour conversion)
  let adjustedHour = hour;
  if (meridiem === "PM" && hour !== 12) {
    adjustedHour = hour + 12; // Convert PM hour to 24-hour format
  } else if (meridiem === "AM" && hour === 12) {
    adjustedHour = 0; // Convert 12 AM to 00 in 24-hour format
  }

  // Return the formatted time as 24-hour format with minute padding
  return `${adjustedHour.toString().padStart(2, "0")}:${formattedMinute}:00`;
}

export function getJobTime(
  currentDate: string,
  hour: number | string,
  minute: number | string,
  meridiem: string | "AM" | "PM"
): string {
  // Validate the currentDate input
  if (isNaN(Date.parse(currentDate))) {
    throw new Error(
      "Invalid date. Please provide a valid date string in YYYY-MM-DD format."
    );
  }

  // Convert the time to 24-hour format (using the provided hour, minute, and meridiem)
  const time24 = convertTo24HourTime(hour, minute, meridiem);

  console.log(time24);
  // Create the full job_time by combining current date with updated time
  const combinedDateTime = `${currentDate}T${time24}Z`; // Append 'Z' for UTC

  // Parse the combined date-time string into a JavaScript Date object
  const jobTime = new Date(combinedDateTime);

  // Return the ISO format
  return jobTime.toISOString();
}
