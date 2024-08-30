// timestampRandomizer.ts

/**
 * Generate a random timestamp in milliseconds from 1970, based on a given range.
 * @param {number} daysRange - The number of days to randomize.
 *                             If 0, 1, or omitted, it returns the current time.
 *                             If greater than 1, it returns the current time minus up to 'daysRange' days.
 * @returns {number} - The timestamp in milliseconds.
 */
export function getRandomTimestamp(daysRange?: number): number {
  // Calculate the current time in milliseconds
  const currentTime = Date.now();

  // If daysRange is 0, 1, or omitted, return the current time
  if (!daysRange || daysRange === 1) {
    return currentTime;
  }

  // Randomize the number of days to subtract (0 to daysRange - 1)
  const randomTime = Math.random() * daysRange;

  // Calculate the timestamp by subtracting the number of random days in milliseconds
  const randomTimestamp = Math.floor(
    currentTime - randomTime * 24 * 60 * 60 * 1000
  ); // 24 hours in milliseconds

  return randomTimestamp;
}
