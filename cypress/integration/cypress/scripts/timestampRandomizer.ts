/**
 * Generate a random timestamp in milliseconds from 1970, based on a given hour range.
 * @param {number} hoursRange - The number of hours to randomize.
 *                              If 0, 1, or omitted, it returns the current time.
 *                              If greater than 1, it returns the current time minus up to 'hoursRange' hours.
 * @returns {number} - The timestamp in milliseconds.
 */
export function getRandomTimestamp(hoursRange?: number): number {
  // Calculate the current time in milliseconds
  const currentTime = Date.now();

  // If hoursRange is 0, 1, or omitted, return the current time
  if (!hoursRange || hoursRange === 1) {
    return currentTime;
  }

  // Randomize the number of hours to subtract (0 to hoursRange - 1)
  const randomTime = Math.random() * hoursRange;

  // Calculate the timestamp by subtracting the number of random hours in milliseconds
  const randomTimestamp = Math.floor(currentTime - randomTime * 60 * 60 * 1000); // 1 hour in milliseconds

  return randomTimestamp;
}
