export const formattedDate = (inputDate: string | null | Date): string => {
  if (inputDate === null) {
    return "-----"; // Return fallback if the date is invalid
  }
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const date = new Date(inputDate);

  // Check if the date is invalid
  if (isNaN(date.getTime())) {
    return "-----"; // Return fallback if the date is invalid
  }

  const day = String(date.getDate()).padStart(2, "0"); // Day as 2 digits
  const month = months[date.getMonth()]; // Month as short name
  const year = date.getFullYear(); // Full year

  return `${day}-${month}-${year}`; // Format as DD-MMM-YYYY
};
