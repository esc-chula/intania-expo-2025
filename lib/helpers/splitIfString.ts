/**
 * Splits a string by a seperator if the value is a string.
 * @param value The value to split.
 * @param seperator The seperator to split by.
 * @returns An array of strings.
 */
export default function splitIfString<Entry = string>(
  value: string | string[],
  seperator: string = ",",
): Entry[] {
  return (
    Array.isArray(value) ? value : value?.split(seperator) || []
  ) as Entry[];
}
