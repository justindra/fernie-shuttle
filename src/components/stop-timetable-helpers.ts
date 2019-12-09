/**
 * Add leading 0s to the front of a number
 * @param num The number to add to
 * @param size The total size of that number
 */
export function leadZero(num: number, size: number): string {
  let s = `${num}`;
  while (s.length < size) s = `0${s}`;
  return s;
}

/**
 * Convert time from integer to human readable 12h time
 * @param time Time in minutes from midnight
 */
export function convertTime(time: number) {
  // Get the time in 24 hour time
  const hour = Math.floor(time / 60);
  const min = Math.floor(time - hour * 60);

  // Get the hours in AM/PM
  const hourAmPm = hour < 12 ? hour : hour - 12;
  const ampm = hour < 12 ? 'AM' : 'PM';

  return `${leadZero(hourAmPm, 2)}:${leadZero(min, 2)} ${ampm}`;
}

/**
 * Check if the given time is within the next half an hour
 * @param timeMin The time to check
 * @param nowMin The current time to check against
 */
export function isInHalfHour(timeMin: number, nowMin: number): boolean {
  const diffMin = timeMin - nowMin;
  return diffMin <= 30 && diffMin >= 0;
}

/**
 * Get the string to say when the next time is due
 * based on the current time and a list of times
 * @param times A list of times in minutes
 */
export function getNextDueMin(times: number[]): string {
  // Get the current time
  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();

  // Sort the array just in case it wasn't sorted
  const sortedTimes = times.sort((a, b) => a - b);
  // Find the next time it occurs
  let nextTime: number = -1;
  for (const time of sortedTimes) {
    if (nowMin < time) {
      nextTime = time;
      break;
    }
  }

  // If its still not assigned, likely will be the first one on the next day
  // so use the first time
  if (nextTime < 0) {
    [nextTime] = sortedTimes;
  }

  // If its within a half hour, display the due time
  if (isInHalfHour(nextTime, nowMin)) {
    return `in ${nextTime - nowMin} min`;
  }

  // Otherwise just return the time
  return `at ${convertTime(nextTime)}`;
}

export default {
  convertTime,
  leadZero,
  isInHalfHour,
  getNextDueMin
};
