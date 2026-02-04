/**
 * ASCII Animation Hooks
 * Animated ASCII art frames for marketing backgrounds
 */

'use client';

import { useEffect, useState, useMemo } from 'react';

// ============================================
// 1. CODE RAIN - Matrix style with code chars
// ============================================
export function useCodeRain(cols: number, rows: number) {
  const [grid, setGrid] = useState<string[][]>([]);
  const codeChars =
    '{}[]()<>=;:const let var function return async await import export => !== === + - * / % && || ! ? . , @ # $ _ 0 1';

  useEffect(() => {
    const chars = codeChars.split(' ');
    const columns = Array.from({ length: cols }, () => ({
      y: Math.random() * rows * -1,
      speed: Math.random() * 0.5 + 0.3,
      length: Math.floor(Math.random() * 10) + 5,
    }));

    const interval = setInterval(() => {
      const newGrid: string[][] = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => ' ')
      );

      columns.forEach((col, x) => {
        for (let i = 0; i < col.length; i++) {
          const y = Math.floor(col.y) - i;
          if (y >= 0 && y < rows) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            newGrid[y][x] = i === 0 ? char : Math.random() > 0.5 ? char : ' ';
          }
        }
        col.y += col.speed;
        if (col.y - col.length > rows) {
          col.y = Math.random() * -10;
          col.length = Math.floor(Math.random() * 10) + 5;
        }
      });

      setGrid(newGrid);
    }, 60);

    return () => clearInterval(interval);
  }, [cols, rows, codeChars]);

  return grid.map((row) => row.join('')).join('\n');
}

// ============================================
// 2. ROCKET LAUNCH - Ship faster theme
// ============================================
const ROCKET_FRAMES = [
  `


         /\\
        /  \\
       /    \\
      |  <>  |
      |      |
     /|      |\\
    / |      | \\
   |  |      |  |
   |  |      |  |
    \\ |______| /
     \\|      |/
      |______|
         ||
         ||
        _||_
       /    \\
`,
  `

         /\\
        /  \\
       /    \\
      |  <>  |
      |      |
     /|      |\\
    / |      | \\
   |  |      |  |
   |  |      |  |
    \\ |______| /
     \\|      |/
      |______|
         ||
        _||_
       / ** \\
      / **** \\
     /  ****  \\
`,
  `
         /\\
        /  \\
       /    \\
      |  <>  |
      |      |
     /|      |\\
    / |      | \\
   |  |      |  |
   |  |      |  |
    \\ |______| /
     \\|      |/
      |______|
         ||
        _||_
       /****\\
      /******\\
     / ****** \\
    /  ******  \\
   /   ******   \\
`,
  `
         /\\
        /  \\
       /    \\
      |  <>  |
      |      |
     /|      |\\
    / |      | \\
   |  |      |  |
   |  |      |  |
    \\ |______| /
     \\|      |/
      |______|
         ||
        _||_
      /*****\\
     /*******\\
    /*********\\
   / ********* \\
  /  *********  \\
 /   *********   \\
`,
];

export function useRocket() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % ROCKET_FRAMES.length);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return ROCKET_FRAMES[frame];
}

// ============================================
// 3. COFFEE STEAM - Developer fuel
// ============================================
export function useCoffeeSteam() {
  const [frame, setFrame] = useState(0);

  const frames = useMemo(
    () => [
      `
        ) )  )
       (  ( (
        ) )  )
       (  ( (
      .------.
      |      |
      |      |
      |      |
      \\      /
       '----'
    `,
      `
       (  ( (
        ) )  )
       (  ( (
        ) )  )
      .------.
      |      |
      |      |
      |      |
      \\      /
       '----'
    `,
      `
        ) )  )
       (  ( (
        ) )  )
       (  ( (
      .------.
      |      |
      |      |
      |      |
      \\      /
       '----'
    `,
      `
       ( (  (
        ) )  )
       ( (  (
        ) )  )
      .------.
      |      |
      |      |
      |      |
      \\      /
       '----'
    `,
    ],
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % frames.length);
    }, 200);
    return () => clearInterval(interval);
  }, [frames.length]);

  return frames[frame];
}

// ============================================
// 4. BUILDING BLOCKS - Components stacking
// ============================================
export function useBuildingBlocks() {
  const [frame, setFrame] = useState(0);

  const frames = [
    `




     ┌─────────┐
     │  AUTH   │
     └─────────┘
    `,
    `



     ┌─────────┐
     │PAYMENTS │
     ├─────────┤
     │  AUTH   │
     └─────────┘
    `,
    `

     ┌─────────┐
     │DASHBOARD│
     ├─────────┤
     │PAYMENTS │
     ├─────────┤
     │  AUTH   │
     └─────────┘
    `,
    `
     ┌─────────┐
     │   AI    │
     ├─────────┤
     │DASHBOARD│
     ├─────────┤
     │PAYMENTS │
     ├─────────┤
     │  AUTH   │
     └─────────┘
    `,
    `
     ┌─────────┐
     │ DEPLOY  │  ✓ READY
     ├─────────┤
     │   AI    │
     ├─────────┤
     │DASHBOARD│
     ├─────────┤
     │PAYMENTS │
     ├─────────┤
     │  AUTH   │
     └─────────┘
    `,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % frames.length);
    }, 800);
    return () => clearInterval(interval);
  }, [frames.length]);

  return frames[frame];
}

// ============================================
// 5. TERMINAL TYPING - Hacker aesthetic
// ============================================
export function useTerminalTyping() {
  const [charIndex, setCharIndex] = useState(0);

  const lines = [
    '$ npx create-fabrk my-app',
    '> Installing dependencies...',
    '> Configuring auth...',
    '> Setting up payments...',
    '> Building dashboard...',
    '✓ Ready to ship!',
    '',
    '$ npm run dev',
    '> Server running at localhost:3000',
    '',
  ];

  const fullText = lines.join('\n');

  useEffect(() => {
    const interval = setInterval(() => {
      setCharIndex((i) => {
        if (i >= fullText.length) return 0;
        return i + 1;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [fullText.length]);

  return fullText.slice(0, charIndex) + '█';
}

// ============================================
// 6. GEARS SPINNING - Infrastructure
// ============================================
export function useGears() {
  const [frame, setFrame] = useState(0);

  const frames = [
    `
       ___         ___
      /   \\       /   \\
     | +-+ |     | +-+ |
      \\___/       \\___/
         \\       /
          \\_____/
          /     \\
       __/       \\__
      /   \\     /   \\
     | +-+ |   | +-+ |
      \\___/     \\___/
    `,
    `
       ___         ___
      / + \\       / + \\
     |  |  |     |  |  |
      \\_+_/       \\_+_/
         \\       /
          \\_____/
          /     \\
       __/       \\__
      / + \\     / + \\
     |  |  |   |  |  |
      \\_+_/     \\_+_/
    `,
    `
       ___         ___
      /   \\       /   \\
     | +-+ |     | +-+ |
      \\___/       \\___/
         \\       /
          \\_____/
          /     \\
       __/       \\__
      /   \\     /   \\
     | +-+ |   | +-+ |
      \\___/     \\___/
    `,
    `
       ___         ___
      / + \\       / + \\
     |  |  |     |  |  |
      \\_+_/       \\_+_/
         \\       /
          \\_____/
          /     \\
       __/       \\__
      / + \\     / + \\
     |  |  |   |  |  |
      \\_+_/     \\_+_/
    `,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % frames.length);
    }, 150);
    return () => clearInterval(interval);
  }, [frames.length]);

  return frames[frame];
}

// ============================================
// 7. HOURGLASS - Time saved
// ============================================
export function useHourglass() {
  const [frame, setFrame] = useState(0);

  const frames = [
    `
     .-------.
     |       |
     | ::::: |
     | ::::: |
     |  :::  |
     \\  :::  /
      \\  :  /
       \\   /
        \\ /
        / \\
       /   \\
      /     \\
     /       \\
     |       |
     |       |
     |       |
     '-------'
    `,
    `
     .-------.
     |       |
     | ::::: |
     |  :::  |
     |   :   |
     \\   :   /
      \\  :  /
       \\ : /
        \\:/
        /:\\
       / : \\
      /  :  \\
     /   :   \\
     |   :   |
     |       |
     |       |
     '-------'
    `,
    `
     .-------.
     |       |
     |  :::  |
     |   :   |
     |       |
     \\       /
      \\  :  /
       \\ : /
        \\:/
        /:\\
       / : \\
      / ::: \\
     / ::::: \\
     | ::::: |
     |  :::  |
     |       |
     '-------'
    `,
    `
     .-------.
     |       |
     |       |
     |       |
     |       |
     \\       /
      \\     /
       \\   /
        \\ /
        / \\
       /   \\
      /:::::\\
     /:::::::\\
     |:::::::|
     |:::::::|
     | ::::: |
     '-------'
    `,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % frames.length);
    }, 500);
    return () => clearInterval(interval);
  }, [frames.length]);

  return frames[frame];
}

// ============================================
// 8. FRUSTRATED TO HAPPY DEV
// ============================================
export function useDevMood() {
  const [frame, setFrame] = useState(0);

  const frames = [
    `
   WITHOUT FABRK:          WITH FABRK:

    .-------.              .-------.
    | x   x |              | ^   ^ |
    |   o   |              |   o   |
    |  ---  |              |  \\_/  |
    '-------'              '-------'

   Week 6: Still          Day 1: Ship!
   writing auth...
    `,
    `
   WITHOUT FABRK:          WITH FABRK:

    .-------.              .-------.
    | -   - |              | ^   ^ |
    |   o   |              |   o   |
    |  ~~~  |              |  \\_/  |
    '-------'              '-------'

   Week 6: Still          Day 1: Ship!
   writing auth...
    `,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % frames.length);
    }, 500);
    return () => clearInterval(interval);
  }, [frames.length]);

  return frames[frame];
}
