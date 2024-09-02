export function getBatchedTimestamps(
  totalJobs: number,
  daysInterval = 7,
  jobsPerDay = 2
) {
  const currentTime = Date.now();
  let timestamps = [];
  for (let i = 0; i < totalJobs; i++) {
    const dayOffset = Math.floor(i / jobsPerDay) * daysInterval;
    const timeOfDayOffset = (Math.random() * 5 + 1) * 60 * 60 * 1000; // Random time between 1 to 6 hours
    timestamps.push(
      currentTime - dayOffset * 24 * 60 * 60 * 1000 - timeOfDayOffset
    );
  }
  return timestamps;
}
