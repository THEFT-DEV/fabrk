/**
 * Perspective Grid Background
 * Creates a 3D perspective grid effect like wodniack.dev
 */
'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface PerspectiveGridProps {
  className?: string;
}

export function PerspectiveGrid({ className }: PerspectiveGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef(0);
  const animationRef = useRef<number | undefined>(undefined);

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

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains('dark');
      ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)';
      ctx.lineWidth = 1;

      // Perspective settings
      const vanishY = height * 0.3; // Vanishing point Y
      const vanishX = width * 0.5; // Center
      const gridCols = 8;
      const gridRows = 12;

      // Scroll-based perspective shift
      const scrollOffset = (scrollRef.current * 0.1) % (height / gridRows);

      // Draw horizontal lines with perspective
      for (let i = 0; i <= gridRows; i++) {
        const progress = i / gridRows;
        // Exponential spacing for depth effect
        const y = vanishY + (height - vanishY) * Math.pow(progress, 1.5) + scrollOffset * progress;

        if (y > 0 && y < height) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
      }

      // Draw vertical lines converging to vanishing point
      for (let i = 0; i <= gridCols; i++) {
        const xBottom = (width / gridCols) * i;
        const xTop = vanishX + (xBottom - vanishX) * 0.3;

        ctx.beginPath();
        ctx.moveTo(xBottom, height);
        ctx.lineTo(xTop, vanishY);
        ctx.stroke();
      }

      // Draw side border lines
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, height);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(width, 0);
      ctx.lineTo(width, height);
      ctx.stroke();

      animationRef.current = requestAnimationFrame(draw);
    };

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', updateSize);
      window.removeEventListener('scroll', handleScroll);
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
