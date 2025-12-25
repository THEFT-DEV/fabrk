'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { Play } from 'lucide-react';

interface DemoVideoModalProps {
  className?: string;
  children?: React.ReactNode;
}

export function DemoVideoModal({ className, children }: DemoVideoModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button
            variant="outline"
            className={cn('px-8 py-3 text-sm', mode.radius, mode.font, className)}
          >
            <Play className="mr-2 h-4 w-4" />
            VIEW DEMO
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className={cn('max-w-4xl p-0 gap-0 border-primary', mode.radius)}>
        <DialogHeader className="border-b border-border bg-card px-4 py-3">
          <DialogTitle className={cn('text-xs', mode.font)}>
            &gt; DEMO.mp4
          </DialogTitle>
        </DialogHeader>

        {/* Video Container */}
        <div className="relative aspect-video bg-black">
          <iframe
            src="https://www.youtube.com/embed/5LWkc8IH9Vg?autoplay=1&rel=0&modestbranding=1"
            title="Fabrk Demo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        </div>

        {/* Terminal Footer */}
        <div className="border-t border-border bg-card px-4 py-2">
          <p className={cn('text-xs', mode.font, mode.color.text.muted)}>
            &gt; Zero to production in under 3 minutes.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
