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

export default {
  convertTime,
  pad: leadZero
};
