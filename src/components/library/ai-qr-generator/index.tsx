'use client';

import * as React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download, Copy, Check, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export interface QrGeneratorProps {
  defaultValue?: string;
  className?: string;
}

const SIZE_OPTIONS = [
  { value: '128', label: '128px (Small)' },
  { value: '256', label: '256px (Medium)' },
  { value: '512', label: '512px (Large)' },
];

const ERROR_LEVELS = [
  { value: 'L', label: 'Low (7%)' },
  { value: 'M', label: 'Medium (15%)' },
  { value: 'Q', label: 'Quartile (25%)' },
  { value: 'H', label: 'High (30%)' },
];

export function AiQrGenerator({
  defaultValue = 'https://fabrk.dev',
  className,
}: QrGeneratorProps) {
  const [value, setValue] = React.useState(defaultValue);
  const [size, setSize] = React.useState('256');
  const [errorLevel, setErrorLevel] = React.useState<'L' | 'M' | 'Q' | 'H'>('M');
  const [copied, setCopied] = React.useState(false);
  const qrRef = React.useRef<HTMLDivElement>(null);

  const handleCopy = async () => {
    if (!qrRef.current) return;

    const svg = qrRef.current.querySelector('svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgData], { type: 'image/svg+xml' });

    try {
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/svg+xml': blob }),
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: copy as text
      await navigator.clipboard.writeText(svgData);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (!qrRef.current) return;

    const svg = qrRef.current.querySelector('svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `qr-code-${Date.now()}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setValue(defaultValue);
    setSize('256');
    setErrorLevel('M');
  };

  return (
    <div className={cn('flex flex-col gap-6 lg:flex-row', className)}>
      {/* Controls */}
      <Card className="flex-1">
        <CardHeader code="0x01" title="QR_CONFIG" />
        <CardContent padding="md" className="space-y-4">
          {/* URL Input */}
          <div className="space-y-2">
            <Label className={cn('text-xs uppercase', mode.font)}>
              [CONTENT]:
            </Label>
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter URL or text..."
              className={cn('text-sm', mode.radius, mode.font)}
            />
          </div>

          {/* Size Select */}
          <div className="space-y-2">
            <Label className={cn('text-xs uppercase', mode.font)}>
              [SIZE]:
            </Label>
            <Select value={size} onValueChange={setSize}>
              <SelectTrigger className={cn('text-sm', mode.radius, mode.font)}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className={mode.radius}>
                {SIZE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Error Correction */}
          <div className="space-y-2">
            <Label className={cn('text-xs uppercase', mode.font)}>
              [ERROR_CORRECTION]:
            </Label>
            <Select value={errorLevel} onValueChange={(v) => setErrorLevel(v as 'L' | 'M' | 'Q' | 'H')}>
              <SelectTrigger className={cn('text-sm', mode.radius, mode.font)}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className={mode.radius}>
                {ERROR_LEVELS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className={cn('flex-1 text-xs', mode.radius, mode.font)}
            >
              <RefreshCw className="mr-2 size-4" />
              RESET
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      <Card className="flex-1">
        <CardHeader code="0x02" title="QR_OUTPUT" />
        <CardContent padding="md" className="flex flex-col items-center gap-4">
          {/* QR Code - white background required for scanability */}
          { }
          <div
            ref={qrRef}
            className={cn(
              'flex items-center justify-center border bg-white p-4',
              mode.radius,
              mode.color.border.default
            )}
          >
            { }
            <QRCodeSVG
              value={value || ' '}
              size={parseInt(size)}
              level={errorLevel}
              bgColor="#ffffff"
              fgColor="#000000"
            />
          </div>

          {/* Download Buttons */}
          <div className="flex w-full gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className={cn('flex-1 text-xs', mode.radius, mode.font)}
            >
              {copied ? (
                <>
                  <Check className="mr-2 size-4" />
                  COPIED
                </>
              ) : (
                <>
                  <Copy className="mr-2 size-4" />
                  COPY SVG
                </>
              )}
            </Button>
            <Button
              size="sm"
              onClick={handleDownload}
              className={cn('flex-1 text-xs', mode.radius, mode.font)}
            >
              <Download className="mr-2 size-4" />
              DOWNLOAD
            </Button>
          </div>

          {/* Info */}
          <p className={cn('text-center text-xs', mode.font, mode.color.text.muted)}>
            QR Code: {value.length} chars | Size: {size}px | Error: {errorLevel}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
