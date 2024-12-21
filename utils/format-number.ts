/**
 * Format a number greater than 1000 to 1k+
 */
export const formatLargeNumber = (num: number) => {
  if (num >= 1000) {
    return `${Math.floor(num / 1000)}k+`;
  }
  return num;
};
