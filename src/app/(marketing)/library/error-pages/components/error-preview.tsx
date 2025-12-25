'use client';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { TemplatePreviewWrapper } from '@/components/library';
import { Home, ArrowLeft, RefreshCw, Lock, Clock, AlertTriangle } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import { errorConfigs } from '../data/error-configs';

interface ErrorPreviewProps {
  errorType: keyof typeof errorConfigs;
}

export function ErrorPreview({ errorType }: ErrorPreviewProps) {
  const error = errorConfigs[errorType];
  const Icon = error.icon;
  const isWarning = error.color === 'warning';

  return (
    <TemplatePreviewWrapper minHeight="600px">
      <div className="flex min-h-[550px] items-center justify-center">
        <div className="mx-auto max-w-lg space-y-6 text-center">
          {/* Icon */}
          <div
            className={cn(
              'mx-auto flex h-20 w-20 items-center justify-center border',
              isWarning ? 'border-warning bg-warning/10' : 'border-destructive bg-destructive/10'
            )}
          >
            <Icon className={cn('h-10 w-10', isWarning ? 'text-warning' : 'text-destructive')} />
          </div>

          {/* Error Code */}
          <div className={cn(mode.font)}>
            <span
              className={cn(
                'text-6xl font-semibold',
                isWarning ? 'text-warning' : 'text-destructive'
              )}
            >
              {error.code}
            </span>
          </div>

          {/* Title & Description */}
          <div>
            <h2 className={cn(mode.font, 'mb-2 text-2xl font-semibold tracking-tight')}>
              {error.title}
            </h2>
            <p className={cn(mode.font, 'text-muted-foreground text-sm')}>{error.description}</p>
          </div>

          {/* Terminal Output */}
          <Card>
            <CardHeader code="0x00" title="OUTPUT" />
            <CardContent>
              <div className="space-y-0.5 text-xs">
                {error.terminal.map((line, idx) => (
                  <div
                    key={idx}
                    className={
                      line.startsWith('ERROR')
                        ? 'text-destructive'
                        : line.startsWith('$')
                          ? 'text-success'
                          : line === ''
                            ? 'h-2'
                            : ''
                    }
                  >
                    {line}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {error.actions.includes('SIGN IN') && (
              <Button className={cn(mode.radius, mode.font, 'text-xs')}>
                <Lock className="mr-1 h-3 w-3" />
                &gt; SIGN IN
              </Button>
            )}
            {error.actions.includes('GO HOME') && (
              <Button className={cn(mode.radius, mode.font, 'text-xs')}>
                <Home className="mr-1 h-3 w-3" />
                &gt; GO HOME
              </Button>
            )}
            {error.actions.includes('GO BACK') && (
              <Button variant="outline" className={cn(mode.radius, mode.font, 'text-xs')}>
                <ArrowLeft className="mr-1 h-3 w-3" />
                &gt; GO BACK
              </Button>
            )}
            {error.actions.includes('TRY AGAIN') && (
              <Button className={cn(mode.radius, mode.font, 'text-xs')}>
                <RefreshCw className="mr-1 h-3 w-3" />
                &gt; TRY AGAIN
              </Button>
            )}
            {error.actions.includes('WAIT') && (
              <Button variant="outline" className={cn(mode.radius, mode.font, 'text-xs')}>
                <Clock className="mr-1 h-3 w-3" />
                &gt; WAIT
              </Button>
            )}
            {error.actions.includes('REFRESH') && (
              <Button className={cn(mode.radius, mode.font, 'text-xs')}>
                <RefreshCw className="mr-1 h-3 w-3" />
                &gt; REFRESH
              </Button>
            )}
            {error.actions.includes('STATUS PAGE') && (
              <Button variant="outline" className={cn(mode.radius, mode.font, 'text-xs')}>
                <AlertTriangle className="mr-1 h-3 w-3" />
                &gt; STATUS PAGE
              </Button>
            )}
          </div>

          {/* Request ID */}
          <div className={cn(mode.font, 'text-muted-foreground text-xs')}>
            [REQUEST ID]: req_abc123def456
          </div>
        </div>
      </div>
    </TemplatePreviewWrapper>
  );
}
