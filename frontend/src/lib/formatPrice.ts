export function formatPrice(value: number | string): string {
  return `Bs. ${Number(value).toFixed(2)}`
}
