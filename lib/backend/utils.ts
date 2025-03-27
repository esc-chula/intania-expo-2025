import { Category } from "@prisma/client";

export function generateSixDiditCode(category: Category, num: number): string {
  const char = category[0];
  const formatNumber = ("00000" + num).slice(-5);
  const sixDigitCode = char + "-" + formatNumber;
  return sixDigitCode;
}
