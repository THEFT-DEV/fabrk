/**
 * Value Breakdown Data - Receipt-style value proposition (EXAMPLE)
 * Used by: ValueBreakdownSection component (boilerplate for buyers)
 * Note: This is example data for demonstration purposes.
 * Replace with your own value proposition when customizing the boilerplate.
 */

export const VALUE_ITEMS = [
  { item: '[EXAMPLE] Feature Package 1', value: '$X,XXX' },
  { item: '[EXAMPLE] Feature Package 2', value: '$X,XXX' },
  { item: '[EXAMPLE] Feature Package 3', value: '$X,XXX' },
  { item: '[EXAMPLE] Feature Package 4', value: '$X,XXX' },
  { item: '[EXAMPLE] Feature Package 5', value: '$X,XXX' },
  { item: '[EXAMPLE] Feature Package 6', value: '$X,XXX' },
  { item: '[EXAMPLE] Feature Package 7', value: '$X,XXX' },
] as const;

export const VALUE_TOTALS = {
  total: '$XX,XXX',
  price: '$XXX',
  savings: '$XX,XXX',
  discount: 'XX%',
} as const;
