/**
 * FUI (Futuristic UI) Background
 * Animated flowing dot grid with organic wave patterns + mouse interaction
 */
'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface FuiBackgroundProps {
  className?: string;
}

export function FuiBackground({ className }: FuiBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const targetMouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number | undefined>(undefined);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const updateSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    const draw = () => {
      timeRef.current += 0.005;
      const time = timeRef.current;

      // Smooth mouse following
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.08;

      const mouse = mouseRef.current;
      const spacing = 16;
      const baseRadius = 1;
      const mouseEffectRadius = 120;
      const mouseStrength = 30;

      ctx.clearRect(0, 0, width, height);

      // Detect theme (use data-theme attribute since .dark class is removed)
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'green';
      const lightThemes = ['bw', 'gameboy', 'gbpocket', 'vic20', 'spectrum', 'infrared'];
      const isLight = lightThemes.includes(currentTheme);

      // Draw flowing dots
      for (let gridX = 0; gridX < width + spacing; gridX += spacing) {
        for (let gridY = 0; gridY < height + spacing; gridY += spacing) {
          // More varied wave displacement with multiple frequencies
          const waveX = Math.sin(gridY * 0.025 + time) * 6 +
                        Math.sin(gridX * 0.018 + time * 0.6) * 5 +
                        Math.sin((gridX * 0.7 + gridY * 1.3) * 0.012 + time * 1.4) * 7 +
                        Math.cos(gridY * 0.035 + gridX * 0.01 + time * 0.9) * 4;

          const waveY = Math.cos(gridX * 0.025 + time * 0.7) * 6 +
                        Math.cos(gridY * 0.018 + time * 1.2) * 5 +
                        Math.cos((gridX * 1.2 - gridY * 0.8) * 0.012 + time * 0.8) * 7 +
                        Math.sin(gridX * 0.035 + gridY * 0.01 + time * 1.1) * 4;

          let x = gridX + waveX;
          let y = gridY + waveY;

          // Mouse interaction - push dots away
          const dx = mouse.x - gridX;
          const dy = mouse.y - gridY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouseEffectRadius && distance > 0) {
            const factor = Math.pow(1 - distance / mouseEffectRadius, 2);
            const angle = Math.atan2(dy, dx);
            x -= Math.cos(angle) * mouseStrength * factor;
            y -= Math.sin(angle) * mouseStrength * factor;
          }

          ctx.beginPath();
          ctx.arc(x, y, baseRadius, 0, Math.PI * 2);
          // Dark dots for light themes, light dots for dark themes
          ctx.fillStyle = isLight ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.15)';
          ctx.fill();
        }
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', updateSize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div
      className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}
