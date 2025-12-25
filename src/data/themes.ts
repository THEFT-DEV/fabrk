/**
 * Theme Configuration
 *
 * WCAG 2.1 AA Compliance:
 * ✅ All themes meet WCAG AA standards (4.5:1 text, 3:1 UI)
 *
 * Effects:
 * - 'crt': CRT monitor scanlines and glow
 * - 'lcd': LCD pixel effect (handhelds)
 * - 'none': No monitor effect (clean)
 */
export type MonitorEffect = 'crt' | 'lcd' | 'none';

export const themeGroups = {
  'Standard CRT': [
    { id: 'amber', name: 'Amber CRT', preview: '#ffb000', wcag: 'aa', effect: 'crt' as MonitorEffect },
    { id: 'blue', name: 'Blue CRT', preview: '#55ccff', wcag: 'aa', effect: 'crt' as MonitorEffect },
    { id: 'green', name: 'Green CRT', preview: '#33ff66', wcag: 'aa', effect: 'crt' as MonitorEffect },
    { id: 'purple', name: 'Purple CRT', preview: '#bb88ff', wcag: 'aa', effect: 'crt' as MonitorEffect },
    { id: 'red', name: 'Red CRT', preview: '#ff6655', wcag: 'aa', effect: 'crt' as MonitorEffect },
  ],
  Inverted: [
    { id: 'infrared', name: 'Infrared', preview: '#cc3333', wcag: 'aa', effect: 'none' as MonitorEffect },
  ],
  Futuristic: [
    { id: 'cyberpunk', name: 'Cyberpunk', preview: '#ff0050', wcag: 'aa', effect: 'none' as MonitorEffect },
    { id: 'phosphor', name: 'Phosphor', preview: '#00ff41', wcag: 'aa', effect: 'none' as MonitorEffect },
    { id: 'holographic', name: 'Holographic', preview: '#00ffff', wcag: 'aa', effect: 'none' as MonitorEffect },
    { id: 'navigator', name: 'Navigator', preview: '#ff8c00', wcag: 'aa', effect: 'none' as MonitorEffect },
    { id: 'blueprint', name: 'Blueprint', preview: '#1a3a5c', wcag: 'aa', effect: 'none' as MonitorEffect },
  ],
  'Retro Computer': [
    { id: 'atari', name: 'Atari 800', preview: '#305070', wcag: 'aa', effect: 'crt' as MonitorEffect },
    { id: 'c64', name: 'C64 Blue', preview: '#352879', wcag: 'aa', effect: 'crt' as MonitorEffect },
    { id: 'spectrum', name: 'ZX Spectrum', preview: '#ffffff', wcag: 'aa', effect: 'crt' as MonitorEffect },
    { id: 'vic20', name: 'VIC-20', preview: '#e0ffff', wcag: 'aa', effect: 'crt' as MonitorEffect },
  ],
  Handheld: [
    { id: 'gameboy', name: 'Game Boy', preview: '#9bbc0f', wcag: 'aa', effect: 'lcd' as MonitorEffect },
    { id: 'gbpocket', name: 'GB Pocket', preview: '#8a8a8a', wcag: 'aa', effect: 'lcd' as MonitorEffect },
  ],
  Light: [{ id: 'bw', name: 'Black & White', preview: '#ffffff', wcag: 'aa', effect: 'none' as MonitorEffect }],
} as const;

// Flattened list for type safety and easy lookup
export const themes = Object.values(themeGroups).flat();

export type ColorTheme = (typeof themes)[number]['id'];
