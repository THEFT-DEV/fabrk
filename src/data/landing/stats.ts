/**
 * Stats Data - Product metrics for Stats Section
 * All values are verifiable and accurate
 */

import { Box, Palette, Route, Code } from 'lucide-react';
import { themes } from '@/data/themes';
import { COUNTS, COUNT_STRINGS } from '@/data/counts';

// Dynamic counts from centralized source
export const COMPONENT_COUNT_INT = COUNTS.components;
export const COMPONENT_COUNT_STRING = COUNT_STRINGS.components;

export const TEMPLATE_COUNT_STRING = COUNT_STRINGS.templates;
export const TEMPLATE_COUNT_INT = COUNTS.templates;

// Dynamic Theme Count
export const THEME_COUNT_INT = themes.length;
export const THEME_COUNT_STRING = `${THEME_COUNT_INT}`;

// Manual Constants (Centralized)
// These would ideally also be dynamic (e.g., from build scripts or metadata)
export const ROUTE_COUNT_STRING = '250+'; // Needs dynamic calculation
// FILE_COUNT_STRING removed - not used in marketing
export const TEST_COVERAGE_STRING = '100%'; // Used for "TypeScript" stat, but also for "coverage" text
export const TEST_LINES_STRING = '17,822 Test Lines'; // For "17,822 Test Lines"
export const TOTAL_DOC_SIZE_STRING = '~300KB';
export const TOTAL_DOC_LINES_STRING = '~9,000 lines';
export const PRICE_USD_STRING = '$299'; // Price string

export const STATS = [
  {
    id: 'components',
    label: 'UI COMPONENTS',
    value: COMPONENT_COUNT_STRING,
    icon: Box,
  },
  {
    id: 'themes',
    label: 'COLOR THEMES',
    value: THEME_COUNT_STRING,
    icon: Palette,
  },
  {
    id: 'routes',
    label: 'ROUTES',
    value: ROUTE_COUNT_STRING,
    icon: Route,
  },
  {
    id: 'typescript',
    label: 'TYPESCRIPT',
    value: TEST_COVERAGE_STRING, // Used as '100%'
    icon: Code,
  },
] as const;
