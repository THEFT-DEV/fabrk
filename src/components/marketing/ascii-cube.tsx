/**
 * Animated ASCII Cube
 * Rotating 3D cube rendered in ASCII characters
 */
'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';

// Pre-rendered frames of a rotating cube
const CUBE_FRAMES = [
  `
    +------+
   /      /|
  /      / |
 +------+  |
 |      |  +
 |      | /
 |      |/
 +------+
`,
  `
     +-----+
    /     /|
   /     / |
  +-----+  |
  |     |  +
  |     | /
  |     |/
  +-----+
`,
  `
      +----+
     /    /|
    /    / |
   +----+  |
   |    |  +
   |    | /
   |    |/
   +----+
`,
  `
       +---+
      /   /|
     /   / |
    +---+  |
    |   |  +
    |   | /
    |   |/
    +---+
`,
  `
        +-+
       / /|
      / / |
     +-+  |
     | |  +
     | | /
     | |/
     +-+
`,
  `
       +---+
      /   /|
     /   / |
    +---+  |
    |   |  +
    |   | /
    |   |/
    +---+
`,
  `
      +----+
     /    /|
    /    / |
   +----+  |
   |    |  +
   |    | /
   |    |/
   +----+
`,
  `
     +-----+
    /     /|
   /     / |
  +-----+  |
  |     |  +
  |     | /
  |     |/
  +-----+
`,
];

// Alternative: Pulsing terminal prompt animation
const TERMINAL_FRAMES = [
  `
  ┌──────────────────────────┐
  │  > INITIALIZING...       │
  │  █                       │
  └──────────────────────────┘
`,
  `
  ┌──────────────────────────┐
  │  > INITIALIZING...       │
  │  ██                      │
  └──────────────────────────┘
`,
  `
  ┌──────────────────────────┐
  │  > INITIALIZING...       │
  │  ███                     │
  └──────────────────────────┘
`,
  `
  ┌──────────────────────────┐
  │  > INITIALIZING...       │
  │  ████                    │
  └──────────────────────────┘
`,
  `
  ┌──────────────────────────┐
  │  > INITIALIZING...       │
  │  █████                   │
  └──────────────────────────┘
`,
  `
  ┌──────────────────────────┐
  │  > LOADING COMPONENTS    │
  │  ██████                  │
  └──────────────────────────┘
`,
  `
  ┌──────────────────────────┐
  │  > LOADING COMPONENTS    │
  │  ███████                 │
  └──────────────────────────┘
`,
  `
  ┌──────────────────────────┐
  │  > LOADING COMPONENTS    │
  │  ████████                │
  └──────────────────────────┘
`,
  `
  ┌──────────────────────────┐
  │  > LOADING COMPONENTS    │
  │  █████████               │
  └──────────────────────────┘
`,
  `
  ┌──────────────────────────┐
  │  > LOADING COMPONENTS    │
  │  ██████████              │
  └──────────────────────────┘
`,
  `
  ┌──────────────────────────┐
  │  > CONFIGURING AUTH      │
  │  ███████████             │
  └──────────────────────────┘
`,
  `
  ┌──────────────────────────┐
  │  > CONFIGURING AUTH      │
  │  ████████████            │
  └──────────────────────────┘
`,
  `
  ┌──────────────────────────┐
  │  > CONFIGURING AUTH      │
  │  █████████████           │
  └──────────────────────────┘
`,
  `
  ┌──────────────────────────┐
  │  > SETTING UP PAYMENTS   │
  │  ██████████████          │
  └──────────────────────────┘
`,
  `
  ┌──────────────────────────┐
  │  > SETTING UP PAYMENTS   │
  │  ███████████████         │
  └──────────────────────────┘
`,
  `
  ┌──────────────────────────┐
  │  > SETTING UP PAYMENTS   │
  │  ████████████████        │
  └──────────────────────────┘
`,
  `
  ┌──────────────────────────┐
  │  > READY TO SHIP 🚀      │
  │  █████████████████       │
  └──────────────────────────┘
`,
  `
  ┌──────────────────────────┐
  │  > READY TO SHIP 🚀      │
  │  ██████████████████      │
  └──────────────────────────┘
`,
  `
  ┌──────────────────────────┐
  │  ✓ FABRK READY           │
  │  ███████████████████████ │
  └──────────────────────────┘
`,
];

// Spinning loader animation
const SPINNER_FRAMES = [
  `
     ╭───────╮
     │ ◐     │
     │ FABRK │
     ╰───────╯
`,
  `
     ╭───────╮
     │ ◓     │
     │ FABRK │
     ╰───────╯
`,
  `
     ╭───────╮
     │ ◑     │
     │ FABRK │
     ╰───────╯
`,
  `
     ╭───────╮
     │ ◒     │
     │ FABRK │
     ╰───────╯
`,
];

interface AsciiAnimationProps {
  variant?: 'cube' | 'terminal' | 'spinner';
  speed?: number;
  className?: string;
}

export function AsciiAnimation({
  variant = 'terminal',
  speed = 150,
  className
}: AsciiAnimationProps) {
  const [frameIndex, setFrameIndex] = useState(0);

  const frames = variant === 'cube'
    ? CUBE_FRAMES
    : variant === 'spinner'
    ? SPINNER_FRAMES
    : TERMINAL_FRAMES;

  useEffect(() => {
    const interval = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % frames.length);
    }, speed);

    return () => clearInterval(interval);
  }, [frames.length, speed]);

  return (
    <pre
      className={cn(
        'text-xs sm:text-sm leading-tight select-none',
        mode.font,
        mode.color.text.primary,
        className
      )}
      aria-hidden="true"
    >
      {frames[frameIndex]}
    </pre>
  );
}
