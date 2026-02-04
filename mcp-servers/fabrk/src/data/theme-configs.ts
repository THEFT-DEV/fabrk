/**
 * Fabrk Theme Configurations
 * 12 terminal-themed color palettes
 */

export interface ThemeConfig {
  name: string;
  displayName: string;
  category: 'crt-phosphor' | 'retro-computer' | 'handheld' | 'monochrome';
  description: string;
  dataTheme: string; // Value for data-theme attribute
  preview: {
    background: string;
    foreground: string;
    primary: string;
    muted: string;
  };
}

export const themeConfigs: ThemeConfig[] = [
  // ============================================================
  // CRT PHOSPHOR THEMES (5)
  // ============================================================
  {
    name: 'green',
    displayName: 'Green CRT',
    category: 'crt-phosphor',
    description: 'Classic green phosphor terminal - P1 phosphor',
    dataTheme: 'green',
    preview: {
      background: '#0a0f0a',
      foreground: '#33ff33',
      primary: '#00ff00',
      muted: '#1a3d1a',
    },
  },
  {
    name: 'amber',
    displayName: 'Amber CRT',
    category: 'crt-phosphor',
    description: 'Warm amber phosphor terminal - P3 phosphor',
    dataTheme: 'amber',
    preview: {
      background: '#0f0a00',
      foreground: '#ffb347',
      primary: '#ff8c00',
      muted: '#3d2a00',
    },
  },
  {
    name: 'blue',
    displayName: 'Blue CRT',
    category: 'crt-phosphor',
    description: 'Cool blue phosphor terminal',
    dataTheme: 'blue',
    preview: {
      background: '#0a0a1a',
      foreground: '#4da6ff',
      primary: '#0080ff',
      muted: '#1a2a4d',
    },
  },
  {
    name: 'red',
    displayName: 'Red CRT',
    category: 'crt-phosphor',
    description: 'Intense red phosphor terminal',
    dataTheme: 'red',
    preview: {
      background: '#1a0a0a',
      foreground: '#ff6b6b',
      primary: '#ff4444',
      muted: '#4d1a1a',
    },
  },
  {
    name: 'purple',
    displayName: 'Purple CRT',
    category: 'crt-phosphor',
    description: 'Royal purple phosphor terminal',
    dataTheme: 'purple',
    preview: {
      background: '#0f0a1a',
      foreground: '#b366ff',
      primary: '#8b5cf6',
      muted: '#2a1a4d',
    },
  },

  // ============================================================
  // RETRO COMPUTER THEMES (4)
  // ============================================================
  {
    name: 'c64',
    displayName: 'Commodore 64',
    category: 'retro-computer',
    description: 'Classic C64 blue and light blue',
    dataTheme: 'c64',
    preview: {
      background: '#40318d',
      foreground: '#7869c4',
      primary: '#6c5eb5',
      muted: '#352879',
    },
  },
  {
    name: 'vic20',
    displayName: 'VIC-20',
    category: 'retro-computer',
    description: 'Commodore VIC-20 cyan aesthetic',
    dataTheme: 'vic20',
    preview: {
      background: '#0c2c3c',
      foreground: '#a4c4d4',
      primary: '#78b4c4',
      muted: '#1a4858',
    },
  },
  {
    name: 'atari',
    displayName: 'Atari 800',
    category: 'retro-computer',
    description: 'Atari 8-bit computer palette',
    dataTheme: 'atari',
    preview: {
      background: '#000050',
      foreground: '#7878ff',
      primary: '#5050ff',
      muted: '#2828a0',
    },
  },
  {
    name: 'spectrum',
    displayName: 'ZX Spectrum',
    category: 'retro-computer',
    description: 'Sinclair ZX Spectrum bright colors',
    dataTheme: 'spectrum',
    preview: {
      background: '#000000',
      foreground: '#cdcdcd',
      primary: '#00cdcd',
      muted: '#0000cd',
    },
  },

  // ============================================================
  // HANDHELD THEMES (2)
  // ============================================================
  {
    name: 'gameboy',
    displayName: 'GameBoy Classic',
    category: 'handheld',
    description: 'Original GameBoy DMG green palette',
    dataTheme: 'gameboy',
    preview: {
      background: '#9bbc0f',
      foreground: '#0f380f',
      primary: '#306230',
      muted: '#8bac0f',
    },
  },
  {
    name: 'gbpocket',
    displayName: 'GameBoy Pocket',
    category: 'handheld',
    description: 'GameBoy Pocket grayscale LCD',
    dataTheme: 'gbpocket',
    preview: {
      background: '#c4cfa1',
      foreground: '#1a1c19',
      primary: '#43523d',
      muted: '#8b956d',
    },
  },

  // ============================================================
  // MONOCHROME (1)
  // ============================================================
  {
    name: 'bw',
    displayName: 'Black & White',
    category: 'monochrome',
    description: 'Pure monochrome terminal',
    dataTheme: 'bw',
    preview: {
      background: '#0a0a0a',
      foreground: '#e5e5e5',
      primary: '#ffffff',
      muted: '#404040',
    },
  },
];

// Helper to get themes by category
export function getThemesByCategory(category: ThemeConfig['category']): ThemeConfig[] {
  return themeConfigs.filter((t) => t.category === category);
}

// Helper to find theme by name
export function findTheme(name: string): ThemeConfig | undefined {
  return themeConfigs.find(
    (t) => t.name === name || t.displayName.toLowerCase() === name.toLowerCase()
  );
}

// Get all category names
export const themeCategories = [
  { id: 'crt-phosphor', name: 'CRT Phosphor', count: 5 },
  { id: 'retro-computer', name: 'Retro Computer', count: 4 },
  { id: 'handheld', name: 'Handheld', count: 2 },
  { id: 'monochrome', name: 'Monochrome', count: 1 },
] as const;
