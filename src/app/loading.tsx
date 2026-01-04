import { Loader2 } from 'lucide-react';

/**
 * Root Loading Component
 * Shown while pages are loading
 */
export default function Loading() {
  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center">
      <div className="text-center">
        <Loader2 className="text-primary mx-auto h-12 w-12 animate-spin" />
        <p className="text-muted-foreground mt-4 text-sm">Loading...</p>
      </div>
    </div>
  );
}
