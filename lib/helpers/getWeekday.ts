/**
 * Extract weekday from date.
 * @param date Date object.
 * @returns Weekday in Thai.
 */
export default function getWeekday(date: Date) {
  return new Intl.DateTimeFormat("th-TH", { weekday: "long" }).format(date);
}
