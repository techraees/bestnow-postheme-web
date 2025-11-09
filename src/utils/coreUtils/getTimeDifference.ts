export const getTimeDifference = (dateObj: string | Date): string => {
  const date = new Date(dateObj); // Ensure input is converted to a Date object
  if (isNaN(date.getTime())) {
    return "Invalid date provided"; // Handle invalid dates
  }

  const currentTime = new Date();
  const diffInMs = currentTime.getTime() - date.getTime();

  if (diffInMs < 0) {
    return "Invalid date in the future";
  }

  const diffInSeconds = Math.floor(diffInMs / 1000);
  if (diffInSeconds <= 59) return `${diffInSeconds} seconds ago`;

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes <= 59) return `${diffInMinutes} minutes ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours <= 24) return `${diffInHours} hours ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays <= 3) return `${diffInDays} days ago`;

  // If more than 3 days ago, return the formatted date
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
