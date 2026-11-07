export function formatPrice(amount: number, currency: string): string {
  if (amount <= 0) return 'Free';
  return `${amount.toFixed(2)} ${currency}`;
}
