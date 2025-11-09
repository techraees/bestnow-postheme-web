/**
 * Converts a number into a shortened format with "k" notation.
 * If the number is 1000 or more, it divides by 1000 and keeps one decimal place.
 * If the number is less than 1000, it returns the number as a string.
 *
 * @param {number} num - The number to be formatted.
 * @returns {string} - The formatted number with "k" notation (e.g., "3k", "30.5k").
 *
 * @example
 * formatToK(3000); // "3k"
 * formatToK(30500); // "30.5k"
 * formatToK(18031); // "18k"
 * formatToK(500); // "500"
 */
export function formatToK(num: number): string {
  if (num >= 1000) {
    let formatted = (num / 1000).toFixed(1);
    return `${parseFloat(formatted)}k+`;
  }
  return num.toString();
}
