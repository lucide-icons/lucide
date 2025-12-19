export function formatFixed(number: number, decimals = 3): string {
  return parseFloat(number.toFixed(decimals)).toString(10);
}
