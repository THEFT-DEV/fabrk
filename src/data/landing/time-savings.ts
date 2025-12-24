/**
 * Time Savings Data - Breakdown showing time saved (EXAMPLE)
 * Used by: TimeSavingsSection component (boilerplate for buyers)
 * Note: This is example data for demonstration purposes.
 * Replace with your own time savings breakdown when customizing the boilerplate.
 */

export const TIME_BREAKDOWN = [
  {
    id: 'example-1',
    task: '[EXAMPLE] Feature Set 1',
    hours: 30,
    activities: ['[EXAMPLE] Activity', '[EXAMPLE] Activity', '[EXAMPLE] Activity'],
  },
  {
    id: 'example-2',
    task: '[EXAMPLE] Feature Set 2',
    hours: 40,
    activities: ['[EXAMPLE] Activity', '[EXAMPLE] Activity', '[EXAMPLE] Activity'],
  },
  {
    id: 'example-3',
    task: '[EXAMPLE] Feature Set 3',
    hours: 50,
    activities: ['[EXAMPLE] Activity', '[EXAMPLE] Activity', '[EXAMPLE] Activity'],
  },
  {
    id: 'example-4',
    task: '[EXAMPLE] Feature Set 4',
    hours: 25,
    activities: ['[EXAMPLE] Activity', '[EXAMPLE] Activity'],
  },
  {
    id: 'example-5',
    task: '[EXAMPLE] Feature Set 5',
    hours: 35,
    activities: ['[EXAMPLE] Activity', '[EXAMPLE] Activity'],
  },
  {
    id: 'example-6',
    task: '[EXAMPLE] Feature Set 6',
    hours: 15,
    activities: ['[EXAMPLE] Activity', '[EXAMPLE] Activity'],
  },
  {
    id: 'example-7',
    task: '[EXAMPLE] Feature Set 7',
    hours: 20,
    activities: ['[EXAMPLE] Activity', '[EXAMPLE] Activity'],
  },
] as const;

// Calculate total hours
export const TOTAL_HOURS = TIME_BREAKDOWN.reduce((sum, item) => sum + item.hours, 0);
export const TOTAL_WEEKS = Math.round(TOTAL_HOURS / 40);
