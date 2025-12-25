import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface FileStructureLineProps {
  path: string;
  label?: string;
}

export function FileStructureLine({ path, label }: FileStructureLineProps) {
  const segments = path.split('/').filter(Boolean);
  const fileName = segments.pop() || '';

  return (
    <div>
      {segments.map((segment, idx) => (
        <span key={idx}>
          <span
            className={segment.startsWith('(') ? mode.color.text.muted : mode.color.text.accent}
          >
            {segment}
          </span>
          <span className={mode.color.text.muted}>/</span>
        </span>
      ))}
      <span className={mode.color.text.primary}>{fileName}</span>
      {label && <span className={cn('ml-4', mode.color.text.muted)}>{label}</span>}
    </div>
  );
}
